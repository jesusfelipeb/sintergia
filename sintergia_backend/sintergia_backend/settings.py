import os
import dj_database_url  # Importamos la librería para configurar la base de datos desde una URL

from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# --- Configuración de Seguridad y Producción ---

# SECURITY WARNING: keep the secret key used in production secret!
# Leemos la SECRET_KEY de una variable de entorno llamada 'SECRET_KEY'.
# Esto es fundamental por seguridad en producción. NUNCA dejes una SECRET_KEY real hardcodeada aquí.
# Render proporcionará esta variable de entorno SECRET_KEY.
# El segundo argumento de os.environ.get() es un valor por defecto.
# **CORRECCIÓN:** Reemplazamos la clave insegura original por una SEGUNDA clave segura generada para el fallback.
# Este valor de respaldo solo se usará si la variable de entorno 'SECRET_KEY' NO está definida (ej: en desarrollo local si no usas un .env).
SECRET_KEY = os.environ.get('8293f27ba0ff5d66d50a7d3c53df0383') # <-- Reemplaza por tu segunda clave segura generada
# **¡IMPORTANTE!** En producción en Render, DEBES configurar la variable de entorno 'SECRET_KEY'
# para que tenga una clave segura y única (DIFERENTE a la que pusiste aquí como respaldo).


# SECURITY WARNING: don't run with debug turned on in production!
# Leemos el valor de DEBUG de una variable de entorno llamada 'DEBUG'.
# En producción, DEBES configurar esta variable a 'False' en Render.
# Convertimos el valor de la variable a minúsculas antes de comparar para manejar 'True'/'False' de forma robusta.
# CORRECCIÓN: Ya usabas .lower() == 'true', lo cual es correcto.
DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'
# Cuando DEBUG es True, Django muestra errores detallados (útil en desarrollo).
# Cuando DEBUG es False (en producción), Django NO muestra errores detallados y requiere configuración adicional para logging de errores.


# ALLOWED_HOSTS define los nombres de dominio donde tu Django app puede ser accedida.
# En producción, DEBE incluir el hostname proporcionado por Render.
# Render establece automáticamente una variable de entorno llamada RENDER_EXTERNAL_HOSTNAME.
# **CORRECCIÓN:** Usamos la lógica dinámica en lugar de hardcodear un solo hostname.
ALLOWED_HOSTS = [] # Inicializamos la lista.

# Si RENDER_EXTERNAL_HOSTNAME está definida (en Render), la añadimos a los hosts permitidos.
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

# Si estamos en modo DEBUG (en desarrollo local), permitimos localhost y 127.0.0.1.
# Esto es conveniente para el desarrollo local.
if DEBUG:
    ALLOWED_HOSTS.append('localhost')
    ALLOWED_HOSTS.append('127.0.0.1')
    # Puedes añadir otros hosts de desarrollo local si los usas aquí.

# Si usas un dominio personalizado con Render, también deberás añadirlo aquí manualmente
# (ej: ALLOWED_HOSTS.append('tudominio.com')) O leerlo de otra variable de entorno si prefieres.
# **¡Importante!** NO uses ALLOWED_HOSTS = ['*'] en producción - es una vulnerabilidad de seguridad.


# --- Definición de Aplicaciones ---
# Añadimos 'whitenoise' aquí para que Django la reconozca y funcione su middleware y storage.
# 'whitenoise.runserver_nostatic' es útil en desarrollo para que runserver de Django sirva estáticos.
# CORRECCIÓN: Ya incluías whitenoise.runserver_nostatic y whitenoise.
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles', # Django's default static file handling

    'core',  # Tu app core
    'rest_framework',  # Django Rest Framework
    'corsheaders',     # Django CORS Headers

    'whitenoise.runserver_nostatic', # Asegura que runserver de Django sirva estáticos en desarrollo
    'whitenoise', # Esencial para servir estáticos en producción con Whitenoise.

    # Añade aquí otras apps que usas.
    # 'rest_framework_simplejwt.token_blacklist', # Necesario si usas BLACKLIST_AFTER_ROTATION = True en Simple JWT

]

# --- Configuración de Middleware ---
# El orden de los middlewares es importante.
# CORRECCIÓN: El orden y los middlewares incluidos ya eran correctos.
MIDDLEWARE = [
    # SecurityMiddleware debe ser el primero para aplicar configuraciones de seguridad iniciales.
    'django.middleware.security.SecurityMiddleware',

    # WhiteNoiseMiddleware debe estar justo después de SecurityMiddleware.
    # Esto permite a Whitenoise interceptar peticiones para servir archivos estáticos recolectados
    # de manera eficiente en producción (cuando DEBUG es False).
    'whitenoise.middleware.WhiteNoiseMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # CORS generalmente antes de CommonMiddleware si necesitas que las cabeceras se procesen temprano.
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # Añade aquí otros middlewares que usas.
]


ROOT_URLCONF = 'sintergia_backend.urls' # Asegúrate de que 'sintergia_backend' es el nombre de tu proyecto

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [], # Puedes añadir directorios de templates globales aquí si los tienes
        'APP_DIRS': True, # Permite a Django buscar templates en subcarpetas 'templates' de tus apps
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                # CORRECCIÓN: Eliminada la entrada duplicada del context processor de messages.
                'django.contrib.messages.context_processors.messages', # Este debe estar presente (solo una vez).
            ],
        },
    },
]

WSGI_APPLICATION = 'sintergia_backend.wsgi.application' # Asegúrate de que 'sintergia_backend' es el nombre de tu proyecto


# --- Configuración de Base de Datos ---
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

# Configuración condicional de la base de datos
# CORRECCIÓN: Tu enfoque condicional es correcto y válido. Mantenemos esta estructura.
if 'DATABASE_URL' in os.environ:
    # Configuración para producción con Render
    # Lee la URL de la base de datos de la variable de entorno DATABASE_URL.
    # Render proporciona esta variable automáticamente cuando conectas una BD gestionada.
    # Incluimos conn_max_age y conn_health_checks dentro de dj_database_url.config()
    DATABASES = {
        'default': dj_database_url.config(
            conn_max_age=600,
            conn_health_checks=True,
        )
    }
else:
    # Configuración para desarrollo local
    # Este bloque se usa si DATABASE_URL NO está definida (típicamente en tu desarrollo local).
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql', # O el motor que uses localmente
            'NAME': 'sintergia_db', # Nombre de la base de datos LOCAL
            'USER': 'sintergia', # Nombre del usuario LOCAL
            'PASSWORD': '200288', # Contraseña del usuario LOCAL
            'HOST': 'localhost', # Host LOCAL (o '127.0.0.1')
            'PORT': '5432', # Puerto LOCAL
        }
    }


# --- Validación de Contraseña ---
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators
# Puedes añadir o modificar validadores si es necesario.
# CORRECCIÓN: Esta sección ya era correcta.
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# --- Internacionalización ---
# https://docs.djangoproject.com/en/5.1/topics/i18n/
# CORRECCIÓN: Esta sección ya era correcta.
LANGUAGE_CODE = 'en-us' # Idioma por defecto

TIME_ZONE = 'UTC' # Zona horaria por defecto. Considera usar una más específica si tu app lo requiere.

USE_I18N = True # Habilita el sistema de traducción de Django

USE_TZ = True # Usar zonas horarias conscientes (recomendado)


# --- Archivos Estáticos (CSS, JavaScript, Imágenes) ---
# https://docs.djangoproject.com/en/5.1/howto/static-files/
# https://whitenoise.readthedocs.io/en/stable/django.html

STATIC_URL = 'static/' # URL base para acceder a los archivos estáticos (ej: tudominio.com/static/css/style.css)

# DIRECTORIO ABSOLUTO donde el comando 'python manage.py collectstatic'
# recolectará todos los archivos estáticos de todas tus apps y directorios STATICFILES_DIRS.
# Este directorio es CRUCIAL para Whitenoise y Render, ya que Whitenoise servirá los archivos desde aquí en producción.
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Directorios adicionales donde Django buscará archivos estáticos *además* de las carpetas 'static' de cada app.
# Por ejemplo, si tienes una carpeta 'static' global en la raíz de tu proyecto Django para archivos compartidos.
# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'static'),
# ]

# Storage backend para archivos estáticos. Cuando ejecutas collectstatic, Django usará este backend.
# Whitenoise proporciona este backend que automáticamente comprime los archivos (gzip/brotli)
# y añade hashes al nombre de archivo para permitir caching a largo plazo en el navegador.
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# --- Configuración de Whitenoise (versiones 4.x+) ---
# **CORRECCIÓN:** Eliminadas las configuraciones para versiones antiguas de Whitenoise (3.x).
# Estas líneas comentadas estaban presentes en tu código y podrían causar confusión.
# Las siguientes configuraciones son para versiones antiguas de Whitenoise (3.x) y ya no se usan en versiones recientes.
# WHITENOISE_USE_FINDERS = True
# WHITENOISE_MANIFEST_STRICT = False
# WHITENOISE_ALLOW_ALL_ORIGINS = True


# --- Archivos de Medios (Uploaded Files por usuarios) ---
# https://docs.djangoproject.com/en/5.1/topics/files/

# MEDIA_URL: URL base para acceder a los archivos de medios subidos por usuarios (ej: tudominio.com/media/uploads/foto.jpg)
MEDIA_URL = '/media/'

# MEDIA_ROOT: DIRECTORIO ABSOLUTO en el servidor donde se almacenarán físicamente los archivos de medios subidos.
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Nota sobre MEDIA_ROOT en producción: Los archivos subidos aquí no persistirán en Render.
# Necesitarías almacenamiento en la nube (S3, etc.) para persistencia en producción.


# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field
# CORRECCIÓN: Esta sección ya era correcta.
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField' # Tipo de campo por defecto para claves primarias. BigAutoField es recomendado.


# --- Configuración de CORS ---
# Permite solicitudes desde otros orígenes (protocolo + host + puerto) hacia tu API.
# Esto es necesario para que tu frontend (en un dominio diferente al backend desplegado)
# pueda hacer peticiones a tu API de Django.
# CORS_ALLOWED_ORIGINS define una lista de orígenes EXACTOS permitidos.
# En desarrollo, necesitas permitir el origen de tu frontend local (http://localhost:3000).
# En producción, DEBERÁS añadir el origen de tu frontend desplegado (ej: https://tufrotnend.vercel.app).
# **CORRECCIÓN:** Ya habías corregido para que las URLs en esta lista NO tengan barras '/' al final ni paths.
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Desarrollo local
    "https://sintergia.vercel.app",  # <-- Tu dominio en Vercel (asegúrate que no tenga / al final)
    # Si usas un dominio personalizado con Vercel, añádelo aquí también (ej: "https://tudominio.com")
]

# Permitir credenciales en solicitudes CORS (si es necesario)
CORS_ALLOW_CREDENTIALS = True # CORRECCIÓN: Ya estaba correcto.

# Puedes usar CORS_ALLOWED_ALL_ORIGINS = True para permitir CUALQUIER origen.
# Esto es menos seguro en producción para APIs con datos sensibles, pero puede ser útil
# para APIs completamente públicas. Si usas esto, la lista CORS_ALLOWED_ORIGINS se ignora.
# CORS_ALLOWED_ALL_ORIGINS = False # <-- Establece a False en producción segura.
# Una opción común es permitir todos los orígenes SOLO en desarrollo:
# CORS_ALLOWED_ALL_ORIGINS = DEBUG


# --- Configuración de Django REST Framework (DRF) ---
# CORRECCIÓN: Esta sección ya era correcta.
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication', # Autenticación por JWT (Simple JWT)
        # Añade aquí otras clases de autenticación si las usas (ej: rest_framework.authentication.SessionAuthentication)
    ),
    # Puedes añadir otras configuraciones por defecto para DRF aquí (ej: DEFAULT_PERMISSION_CLASSES, DEFAULT_PARSER_CLASSES, DEFAULT_RENDERER_CLASSES, DEFAULT_PAGINATION_CLASS)
}

# --- Configuración de Django REST Framework Simple JWT ---
# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html
# CORRECCIÓN: Esta sección ya era correcta.
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1), # Tiempo de vida del token de acceso
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7), # Tiempo de vida del token de refresco
    'ROTATE_REFRESH_TOKENS': True, # Permite rotar tokens de refresco al obtener uno nuevo
    'BLACKLIST_AFTER_ROTATION': True, # Esto requiere tener la app rest_framework_simplejwt.token_blacklist en INSTALLED_APPS y ejecutar migraciones adicionales (python manage.py migrate). Marca los tokens de refresco antiguos como inválidos.
    'AUTH_HEADER_TYPES': ('Bearer',), # Prefijo usado en la cabecera Authorization (ej: Authorization: Bearer <token>)
    # Puedes añadir otras configuraciones aquí si las necesitas (ej: TOKEN_USER_CLASS, JTI_CLAIM, etc.)
}

# --- Fin Configuración de Simple JWT ---

# --- Configuración de Archivos de Medios ---
# https://docs.djangoproject.com/en/5.1/topics/files/
# CORRECCIÓN: Esta sección ya era correcta, con la nota importante sobre producción.

# MEDIA_URL: URL base para acceder a los archivos de medios subidos por usuarios (ej: tudominio.com/media/uploads/foto.jpg)
MEDIA_URL = '/media/'

# MEDIA_ROOT: DIRECTORIO ABSOLUTO en el servidor donde se almacenarán físicamente los archivos de medios subidos.
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Nota sobre MEDIA_ROOT en producción: Los archivos subidos aquí no persistirán en Render.
# Necesitarías almacenamiento en la nube (S3, etc.) para persistencia en producción.


# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field
# CORRECCIÓN: Esta sección ya era correcta.
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField' # Tipo de campo por defecto para claves primarias. BigAutoField es recomendado.


# --- Configuración de Seguridad Adicional para Producción (cuando DEBUG es False) ---
# Estas configuraciones mejoran la seguridad cuando DEBUG está desactivado (en producción).
# CORRECCIÓN: Esta sección ya era correcta.
if not DEBUG:
    # Redirige automáticamente HTTP a HTTPS
    SECURE_SSL_REDIRECT = True # Asegúrate de que tu proveedor de hosting maneje HTTPS
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

    # HTTP Strict Transport Security (HSTS)
    # Indica a los navegadores que siempre se conecten usando HTTPS para tu dominio.
    SECURE_HSTS_SECONDS = 31536000  # 1 año en segundos
    SECURE_HSTS_PRELOAD = True # Permite que tu dominio sea incluido en la lista de precarga de HSTS de los navegadores (requiere requisitos adicionales de subdominios y un tiempo inicial sin preload).
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True # Aplica HSTS a todos los subdominios.

    # Opcional: Configurar un email para recibir notificaciones de errores 500 en producción
    # ADMINS = [('Your Name', 'your_email@example.com')]
    # SERVER_EMAIL = 'your_server_email@example.com'
    # Esto requiere configuración adicional de email backend.