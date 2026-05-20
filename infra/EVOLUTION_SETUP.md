# Setup — Evolution API paralelo a Baileys 7

> **Estado:** archivos listos, **levantar y configurar instancia es manual de Felipe**.
> Decisión 2026-05-19: Evolution API corre **en paralelo a Baileys 7** para A/B test, no lo reemplaza.

---

## Arquitectura

```
┌───────────────────────────────────────────────────┐
│  STACK SINTERGIA (docker compose, red interna)    │
├───────────────────────────────────────────────────┤
│  EXISTENTES:                                       │
│    postgres        :5432 (interno, solo N8N)       │
│    redis           :6379 (interno, solo N8N)       │
│    n8n             :5678                           │
│    whatsapp-bot    :3001  ← Baileys 7 (intacto)   │
│                                                     │
│  NUEVOS (este setup):                              │
│    evolution-postgres  (interno, solo Evolution)   │
│    evolution-redis     (interno, solo Evolution)   │
│    evolution-api       :8087  ← Evolution paralelo │
└───────────────────────────────────────────────────┘
```

**Puertos:**
- N8N: `http://localhost:5678`
- Baileys QR panel: `http://localhost:3001/qr`
- Evolution API: `http://localhost:8087`

**Webhooks N8N (paths):**
- Baileys (existente): `/webhook/lead-capture`
- Evolution (nuevo): `/webhook/whatsapp-evolution`

---

## PASO 1 — Levantar el stack Evolution

Desde `~/Documentos/agente/sintergia/infra/`:

```bash
# Forzar pull de la imagen latest (la local puede tener 15 meses)
docker compose pull evolution-api

# Levantar solo los servicios nuevos (no toca los existentes)
docker compose up -d evolution-postgres evolution-redis evolution-api

# Verificar
docker compose ps
```

Deberías ver 7 servicios `Up`: los 4 originales + 3 nuevos.

Logs del Evolution si querés mirar arranque:
```bash
docker compose logs -f evolution-api
```

---

## PASO 2 — Crear la instancia `sintergia` en Evolution

Evolution maneja múltiples "instancias" (cada una es una sesión WhatsApp distinta). Creamos `sintergia`:

```bash
# Cargar la API key del .env
source .env

# Crear instancia
curl -X POST http://localhost:8087/instance/create \
  -H "Content-Type: application/json" \
  -H "apikey: $EVOLUTION_API_KEY" \
  -d "{
    \"instanceName\": \"$EVOLUTION_INSTANCE_NAME\",
    \"integration\": \"WHATSAPP-BAILEYS\",
    \"qrcode\": true,
    \"webhook\": {
      \"url\": \"http://n8n:5678/webhook/whatsapp-evolution\",
      \"byEvents\": false,
      \"base64\": false,
      \"events\": [\"MESSAGES_UPSERT\", \"CONNECTION_UPDATE\", \"QRCODE_UPDATED\"],
      \"headers\": {\"apikey\": \"$EVOLUTION_API_KEY\"}
    }
  }"
```

Respuesta esperada: JSON con `instance.instanceName: "sintergia"`, `qrcode.base64: "data:image/png;base64,..."`.

---

## PASO 3 — Escanear QR

### Opción A — Manager web (más cómodo)

Evolution v2 incluye un Manager interno en:
```
http://localhost:8087/manager
```
Login con la `EVOLUTION_API_KEY` del `.env`. Ver instancia `sintergia` → botón "QR Code" → escanear con WhatsApp del celular (Linked devices → Link a device).

### Opción B — Vía API (si manager no carga)

```bash
curl http://localhost:8087/instance/connect/sintergia \
  -H "apikey: $EVOLUTION_API_KEY" | jq -r .qrcode.base64 | sed 's|^data:image/png;base64,||' | base64 -d > /tmp/qr.png
xdg-open /tmp/qr.png
```

> ⚠️ **NO escanees con un WhatsApp que ya esté vinculado al Baileys** (puerto 3001). Vas a kickear al otro. Usá número distinto o desvinculá Baileys primero.

---

## PASO 4 — Importar el workflow N8N

1. http://localhost:5678 → **Workflows** → **+ Add Workflow** → menú 3 puntos → **Import from File**
2. Seleccionar `infra/workflow-whatsapp-evolution.json`
3. Se cargan 11 nodos (incluyendo 2 NoOp para ramas "ignorar" y "rechazado")

### Verificar el workflow

- **Webhook Evolution** → método POST, path `/whatsapp-evolution`
- **Verificar apikey** → IF que compara header `apikey` con `$env.EVOLUTION_API_KEY`. Si falla → rama "Rechazado"
- **Filter (msg entrante texto)** → IF triple: `event=messages.upsert` + `fromMe=false` + `text no vacío`. Si falla → rama "Ignorar" (responde 200 sin acción)
- **Extraer mensaje** → Set node con `instance`, `phone`, `text`, `push_name`, `timestamp`
- **Cadencia humana (3s)** → Wait 3s antes de responder (más humano)
- **AI Agent (Groq)** → HTTP Request a Groq con system prompt simplificado
- **Parsear respuesta + META** → Code node que separa el texto visible del tag `---META---` JSON
- **Responder WhatsApp** → POST a `http://evolution-api:8080/message/sendText/{instance}` con `apikey` header

### Activar el workflow

Toggle **Inactive → Active**. Cuando lo actives, fijate de que el `activeVersionId` se sincronice (ver `DECISIONES.md` 2026-05-12 sobre el bug de versionado en N8N v2.16).

---

## PASO 5 — Test end-to-end

Desde otro WhatsApp, mandá un mensaje al número que escaneaste en el paso 3:

> "Hola, tengo un consultorio y quiero saber sus planes"

Flujo esperado (~5 segundos):
1. Evolution recibe el mensaje
2. Dispara webhook a N8N (`/webhook/whatsapp-evolution` con header `apikey`)
3. N8N verifica el apikey → OK
4. Filtra → es msg de texto entrante
5. Extrae phone/text/instance
6. Espera 3s (cadencia humana)
7. Llama a Groq → respuesta con tag META
8. Parsea, separa texto visible del JSON META
9. POST a Evolution para responder al usuario
10. El otro WhatsApp recibe la respuesta del agente

Si algo falla, mirá:
- **Logs Evolution:** `docker compose logs -f evolution-api`
- **Ejecución N8N:** sidebar izquierdo → **Executions** → última → ver qué nodo está en rojo
- **DB de N8N:** ejecuciones en tabla `execution_entity`, errores en `execution_data`

---

## Diferencias prácticas vs Baileys 7 (para el A/B test)

| Aspecto | Baileys 7 (puerto 3001) | Evolution API (puerto 8087) |
|---|---|---|
| Custom code | Sí, mantenemos Node.js custom | No, todo via API REST |
| Multi-instancia | 1 sesión hardcoded | N instancias (escalable) |
| Manager web | Solo QR | Manager completo con dashboard |
| API REST | No expone API | Sí, completo y documentado |
| Webhook | Custom en index.js | Configurable por instancia |
| Mantenimiento | Updates manuales (Baileys 7 actualiza) | Updates de imagen Docker |
| Escalabilidad | 1 número | Múltiples números/clientes en una instancia |
| Mediagent fit | No (custom) | ✅ (Mediagent vende Evolution) |

**Para Mediagent (producto enlatado):** Evolution gana porque permite multi-tenant en una sola instancia (un cliente = una `instanceName`). Esa es la promesa central de Mediagent.

---

## Troubleshooting

### `docker compose up` falla con "port already in use"
Algo está usando 8087. Verificá:
```bash
ss -tlnp | grep 8087
```
Cambiar puerto en `docker-compose.yml` (servicio `evolution-api`, sección `ports`) y reflejar en `SERVER_URL` env.

### Webhook a N8N no llega
- Verificá que el workflow esté **Active** en N8N
- Verificá la URL en Evolution: debe ser `http://n8n:5678/...` (nombre de servicio Docker), no `localhost:5678`
- Verificá apikey header coincide con `EVOLUTION_API_KEY` del `.env`

### "instance not found" al crear
La instancia ya existe. Listar:
```bash
curl http://localhost:8087/instance/fetchInstances -H "apikey: $EVOLUTION_API_KEY"
```

### QR no se genera o expira muy rápido
QRs expiran ~60s. Refrescar con:
```bash
curl http://localhost:8087/instance/connect/sintergia -H "apikey: $EVOLUTION_API_KEY"
```

### Apagar Evolution sin tocar el resto
```bash
docker compose stop evolution-api evolution-redis evolution-postgres
```

---

## Próximo paso después de validar Evolution

Cuando Evolution funcione end-to-end (recibe mensajes, responde) → comparar con Baileys 7 durante 1-2 semanas:
- ¿Cuál es más estable?
- ¿Cuál tiene mejor latencia?
- ¿Cuál bloquea menos WhatsApp?
- ¿Cuál tiene mejor UX de gestión?

La que gane queda como **default en Mediagent**. La otra se documenta como alternativa.

Después: **Ola 2 paso 5 (SEO completo + JSON-LD + Google Business Profile)**.
