# Setup — Google Sheets como CRM de leads

> Guía paso a paso para conectar el workflow N8N de captura de leads con un Google Sheet.
> **Estado:** este setup va con `workflow-lead-capture-v2.json` (no toca el v1).

---

## ¿Qué cambió respecto al v1?

| Antes (v1) | Ahora (v2) |
|---|---|
| Notificación Telegram únicamente | Telegram + **Google Sheets append** en paralelo |
| Detección de leads por keywords | **Clasificación LLM** (lead_quality + intent) viene del chat web (paso 2 ya implementado) |
| Mensaje Telegram genérico | Mensaje con emoji por temperatura: 🔥 caliente, 🌡️ tibio, 👀 curioso + tag de intent |

El flujo nuevo:

```
Webhook Lead
  └→ Formatear Lead (incluye lead_quality, intent del payload)
       ├→ Guardar Lead (Local)
       └→ Extraer Datos (Groq)
            └→ Parsear Extracción
                 ├→ Formatear Notificación → Enviar Telegram
                 └→ Google Sheets — Leads CRM ← NUEVO
```

---

## PASO 1 — Crear el Google Sheet

1. Ir a https://sheets.new (te crea un sheet nuevo en blanco).
2. Cambiar el nombre del documento a algo claro: **`Sintergia — Leads CRM`**.
3. Cambiar el nombre de la hoja (tab inferior) a **`Leads`** exactamente (case-sensitive).
4. En la fila 1, pegá esta cabecera **exacta** (copiar y pegar como un bloque):

```
fecha	fuente	lead_quality	intent	classification_source	nombre	whatsapp	negocio	problema	solucion_ofrecida	total_mensajes	primer_mensaje	ultimo_mensaje	conversacion
```

> Las columnas están separadas por TAB. Si las pegás en celda A1, Sheets las distribuye automáticamente.

5. **Anotá el ID del Sheet.** Lo encontrás en la URL:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
   ```
   Ejemplo: `1A2B3C4D5E6F7G8H9I0JKL...`

---

## PASO 2 — Configurar credencial Google en N8N

> Esto se hace UNA VEZ y queda configurada para todos los workflows que usen Google Sheets.

### Opción A — OAuth2 (recomendado, lo más rápido)

1. Abrir N8N: http://localhost:5678
2. Sidebar izquierdo → **Credentials** → botón **`+ Add Credential`**
3. Buscar **`Google Sheets OAuth2 API`** → seleccionar.
4. N8N te muestra un botón **`Sign in with Google`** → click.
5. Autoriza tu cuenta de Google con acceso a Sheets.
6. Volvé a N8N → la credencial queda guardada como **`Google Sheets account`** (nombre por defecto, podés renombrar).

### Opción B — Service Account (avanzado, solo si OAuth no funciona)

Si OAuth te da problemas (típico en self-hosted sin HTTPS), creá un Service Account en Google Cloud Console y compartí el Sheet con su email. Documentación: https://docs.n8n.io/integrations/builtin/credentials/google/

---

## PASO 3 — Importar el workflow v2 en N8N

1. En N8N, sidebar izquierdo → **Workflows**.
2. Botón **`+ Add Workflow`** → menú de los 3 puntos arriba a la derecha → **`Import from File`**.
3. Seleccionar `infra/workflow-lead-capture-v2.json`.
4. El workflow se carga con todos los nodos y conexiones.
5. **NO lo actives todavía**. Antes hay que configurar 2 cosas:

### 3.a — Configurar el Sheet ID

1. Click en el nodo **`Google Sheets — Leads CRM`**.
2. Campo **`Document`** dice `__REPLACE_WITH_YOUR_GOOGLE_SHEET_ID__` → reemplazar por el ID del Sheet que anotaste en el paso 1.
   - O click en el dropdown del campo y seleccioná tu Sheet de la lista.
3. Campo **`Sheet`** debería decir `Leads` automáticamente.

### 3.b — Asignar la credencial

1. En el mismo nodo, sección **`Credential to connect with`** → seleccionar la `Google Sheets account` que creaste en el Paso 2.
2. **Save** (arriba a la derecha del editor).

---

## PASO 4 — Activar y testear

### 4.1 — Probar con un payload de prueba

Antes de activar, probá el workflow manualmente:

1. Click en el nodo **`Webhook Lead`** → tab **`Test URL`** → copiar la URL (algo como `http://localhost:5678/webhook-test/lead-capture`).
2. Botón **`Execute Workflow`** (arriba a la derecha) → el webhook queda esperando input.
3. Desde otra terminal, mandá un POST de prueba:

```bash
curl -X POST http://localhost:5678/webhook-test/lead-capture \
  -H "Content-Type: application/json" \
  -d '{
    "source": "web_chat",
    "timestamp": "2026-05-07T15:00:00Z",
    "messageCount": 4,
    "firstMessage": "Hola, tengo una verdulería y quiero un bot",
    "lastMessage": "Sí, me interesa el plan Profesional",
    "classification": {
      "lead_quality": "caliente",
      "intent": "agendar",
      "source": "llm_tag"
    },
    "conversation": [
      {"role": "user", "content": "Hola, tengo una verdulería y quiero un bot"},
      {"role": "assistant", "content": "Hola, le cuento sobre nuestros planes..."},
      {"role": "user", "content": "Cuanto sale el Profesional?"},
      {"role": "assistant", "content": "USD 1500 setup + 120/mes."}
    ]
  }'
```

4. En N8N vas a ver el flujo ejecutarse paso a paso (verde = OK, rojo = error).
5. Verificá:
   - ✅ Te llegó la notificación a Telegram con el emoji 🔥 (caliente) y intent `agendar`.
   - ✅ El Sheet tiene una fila nueva con todos los datos.

### 4.2 — Activar el workflow

Si todo funcionó:

1. Toggle **`Inactive` → `Active`** (arriba a la derecha del editor).
2. Click en `Webhook Lead` → ahora la **Production URL** es la que va a usar tu app:
   ```
   http://localhost:5678/webhook/lead-capture
   ```
3. En tu `.env.local` de Vercel (o en la variable `N8N_WEBHOOK_URL` del proyecto), apuntá a esa URL.

> ⚠️ **Si N8N corre en local pero el chat de Sintergia está en Vercel**, el webhook URL `localhost:5678` no es accesible desde Vercel. Necesitás:
> - **Túnel temporal:** ngrok, cloudflared, localtunnel para exponer N8N públicamente durante pruebas.
> - **Producción:** mover N8N a un VPS con dominio. Está en el ROADMAP como pendiente.

---

## PASO 5 — Decidir qué hacer con el v1

Después de validar v2:

- **Opción A** — Desactivar v1 (`Sintergia - Lead Capture` original) y dejar solo v2 activo. Mismo path `/webhook/lead-capture`, no se duplica.
- **Opción B** — Borrar v1 directamente del N8N (irreversible, pero el JSON queda en git).

---

## Troubleshooting

### "Document not found" en el nodo Sheets
- Verificá que copiaste el ID del Sheet correcto (no la URL completa).
- Verificá que la credencial de Google tiene permiso para acceder a tu Sheet (si usás Service Account, compartí el Sheet con el email del service account).

### Las columnas del Sheet no coinciden
- N8N hace match por nombre de columna (header). Verificá que la fila 1 del Sheet tiene exactamente los nombres que define el workflow:
  ```
  fecha, fuente, lead_quality, intent, classification_source,
  nombre, whatsapp, negocio, problema, solucion_ofrecida,
  total_mensajes, primer_mensaje, ultimo_mensaje, conversacion
  ```

### El webhook recibe pero el Sheet no se actualiza
- Mirá el log de ejecución del workflow en N8N (sidebar izquierdo → `Executions`).
- Si el nodo `Google Sheets` está rojo, click sobre él para ver el error específico.
- Causa común: credencial OAuth expiró → re-autenticar en Credentials.

### El campo `classification` viene `undefined` desde el chat web
- Verificá que tu Sintergia está actualizado al paso 2 de Ola 2 (la API `/api/chat/route.ts` ahora envía `classification` en el payload).
- Para conversaciones cortas o sin intent claro, la clasificación cae a fallback de keywords con `classification_source: "keyword_fallback"`. Eso es esperado.

---

## Próximo paso después de esto

Volver al ROADMAP para arrancar **Ola 2 — Paso 4: Evolution API setup** (mantener Baileys 7 paralelo en otro puerto, agregar Evolution para A/B test).
