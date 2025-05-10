import os
from pathlib import Path
from datetime import timedelta
from decouple import config
from dj_database_url import parse as db_url # parse renombrado a db_url para claridad

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# --- Configuraciones Leídas de Variables de Entorno/ .env ---

# SECRET_KEY: Debe ser leída de variable de entorno. Sin default en config() hará que falle si no está, ¡lo cual es bueno para producción!
SECRET_KEY = config('SECRET_KEY')

# DEBUG: Leer de variable de entorno, con un default de False para producción. cast=bool lo convierte a booleano.
DEBUG = config('DEBUG', default=False, cast=bool)
# TEMPLATE_DEBUG es obsoleto, basta con DEBUG
# TEMPLATE_DEBUG = DEBUG

# ALLOWED_HOSTS: Leer de variable de entorno, con un default de vacío. split(',') lo convierte a lista.
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='').split(',')
# Render inyecta la variable RENDER_EXTERNAL_HOSTNAME con el hostname público. La leemos y añadimos a ALLOWED_HOSTS.
RENDER_EXTERNAL_HOSTNAME = os.getenv('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)
# En modo DEBUG (desarrollo local), permitir localhost y 127.0.0.1
if DEBUG:
    ALLOWED_HOSTS.extend(['localhost', '127.0.0.1'])
    # Evitar duplicados
    ALLOWED_HOSTS = list(set(ALLOWED_HOSTS))


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Apps de terceros
    'rest_framework',
    'corsheaders',
    # 'whitenoise.runserver_nostatic', # Útil en desarrollo para servir estáticos directamente con runserver si Whitenoise da problemas. No necesario en producción.
    'rest_framework_simplejwt.token_blacklist', # Añadir si usas BLACKLIST_AFTER_ROTATION en JWT

    # Tus apps locales
    'core',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # Whitenoise debe ir ANTES del CommonMiddleware para servir estáticos eficientemente.
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # CORS antes de CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'sintergia_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'sintergia_backend.wsgi.application'


# --- Database Configuration ---
# Usar dj_database_url para parsear la URL de la base de datos leída por decouple.
# En producción, Render proveerá DATABASE_URL.
# En desarrollo, debes setear DATABASE_URL en tu archivo .env local.
# La configuración de default='sqlite...' no es necesaria ni recomendada si SIEMPRE usarás PostgreSQL.
# Es mejor que falle si DATABASE_URL no está seteada, tanto localmente como en prod.

DATABASES = {
    'default': config(
        'DATABASE_URL',
        # Quitamos el default de sqlite. Es mejor que DATABASE_URL sea obligatoria.
        # cast=db_url añadirá automáticamente la configuración SSL si la URL es https:// o si se especifica ?sslmode=require
        # Aun así, es buena práctica ser explícito para producción.
        cast=db_url
    )
}

# Asegurarse de que ssl_require es True en producción para la base de datos.
# dj_database_url a menudo lo maneja si la URL es 'postgres://...' o tiene 'sslmode=require',
# pero esta capa adicional asegura que SSL esté activo solo cuando DEBUG es False.
if not DEBUG and 'default' in DATABASES:
     # Añadir sslmode=require a las opciones si no está ya presente
     DATABASES['default']['OPTIONS'].setdefault('sslmode', 'require')
     # Opcional: Añadir otras opciones de conexión si tu proveedor de DB las requiere
     # DATABASES['default']['CONN_MAX_AGE'] = 600 # Ya está en dj_database_url por defecto
     # DATABASES['default']['CONN_HEALTH_CHECKS'] = True # Ya está en dj_database_url por defecto


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# --- Static files (CSS, JavaScript, Images) ---
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = '/static/'
# Directorio donde collectstatic recolectará todos los archivos estáticos de tus apps
STATIC_ROOT = BASE_DIR / 'staticfiles'
# Configuración de Whitenoise para servir archivos estáticos comprimidos y con cache en producción
# Esta es la forma recomendada con Whitenoise v4.0+
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# --- CORS Configuration ---
# Permitir solicitudes desde el frontend. Leer de variable de entorno.
# Los orígenes deben ser http:// o https://
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', default='http://localhost:3000').split(',')
# Leer el dominio del frontend de Vercel de una variable de entorno y añadirlo.
FRONTEND_DOMAIN = config('NEXT_PUBLIC_FRONTEND_DOMAIN', default=None)
if FRONTEND_DOMAIN:
     # Añadir con https:// ya que Vercel usa HTTPS por defecto
     CORS_ALLOWED_ORIGINS.append(f'https://{FRONTEND_DOMAIN}')
     # Si necesitas que http TAMBIÉN esté permitido (menos común y menos seguro en prod, pero posible)
     # CORS_ALLOWED_ORIGINS.append(f'http://{FRONTEND_DOMAIN}')

CORS_ALLOW_CREDENTIALS = True # O False, dependiendo de tu frontend y manejo de cookies/auth

# --- Configuracion JWS (JWT) ---
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    # Si quieres que todas las vistas requieran autenticación por defecto, descomenta:
    # 'DEFAULT_PERMISSION_CLASSES': (
    #     'rest_framework.permissions.IsAuthenticated',
    # )
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=config('ACCESS_TOKEN_LIFETIME_MINUTES', default=60, cast=int)), # Leer tiempo de vida de variable de entorno
    'REFRESH_TOKEN_LIFETIME': timedelta(days=config('REFRESH_TOKEN_LIFETIME_DAYS', default=7, cast=int)), # Leer tiempo de vida de variable de entorno
    'ROTATE_REFRESH_TOKENS': config('ROTATE_REFRESH_TOKENS', default=True, cast=bool),
    'BLACKLIST_AFTER_ROTATION': config('BLACKLIST_AFTER_ROTATION', default=True, cast=bool),
    'AUTH_HEADER_TYPES': ('Bearer',),
    # Agrega otras configuraciones JWT si las necesitas, leyéndolas del entorno.
    # 'SIGNING_KEY': config('SIGNING_KEY', default=SIMPLE_JWT['SIGNING_KEY']), # Puedes leer la clave de firma si la quieres separar
    # 'VERIFYING_KEY': config('VERIFYING_KEY', default=None),
    # 'ALGORITHM': config('SIMPLE_JWT_ALGORITHM', default='HS256'),
}


# --- Media Files ---
# Definimos la URL y la ruta de los archivos de medios (imágenes, documentos, etc.)
MEDIA_URL = '/media/'  # URL para acceder a los archivos de medios

# IMPORTANTE para producción: MEDIA_ROOT local NO FUNCIONARÁ para persistencia en Render u otras PaaS.
# Si los usuarios subirán archivos, DEBES configurar un servicio de almacenamiento en la nube (AWS S3, GCS, etc.)
# Usando django-storages. Esta configuración de MEDIA_ROOT es solo para desarrollo local.
MEDIA_ROOT = BASE_DIR / 'media'


# --- Security Hardening (Production Only) ---
# Aplicar estas configuraciones solo si DEBUG es False
if not DEBUG:
    SECURE_SSL_REDIRECT = config('SECURE_SSL_REDIRECT', default=True, cast=bool)
    SESSION_COOKIE_SECURE = config('SESSION_COOKIE_SECURE', default=True, cast=bool)
    CSRF_COOKIE_SECURE = config('CSRF_COOKIE_SECURE', default=True, cast=bool)
    # HSTS: fuerza HTTPS en navegadores. Activar después de confirmar que HTTPS funciona bien.
    SECURE_HSTS_SECONDS = config('SECURE_HSTS_SECONDS', default=31536000, cast=int) # 1 año
    SECURE_HSTS_INCLUDE_SUBDOMAINS = config('SECURE_HSTS_INCLUDE_SUBDOMAINS', default=True, cast=bool)
    SECURE_HSTS_PRELOAD = config('SECURE_HSTS_PRELOAD', default=True, cast=bool) # Requiere registro previo en lista de precarga HSTS
    SECURE_BROWSER_XSS_FILTER = config('SECURE_BROWSER_XSS_FILTER', default=True, cast=bool) # Considerado obsoleto, pero no hace daño mantenerlo
    SECURE_CONTENT_TYPE_NOSNIFF = config('SECURE_CONTENT_TYPE_NOSNIFF', default=True, cast=bool)
    X_FRAME_OPTIONS = config('X_FRAME_OPTIONS', default='DENY').upper()


# --- Logging ---
# Configuración básica de logging. En producción, los logs irán a la consola de Render.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'simple' if DEBUG else 'verbose', # Simple en desarrollo, verbose en prod
        },
        # Puedes añadir otros handlers como 'file' en desarrollo si quieres guardar logs en archivos
        # 'file': {
        #     'class': 'logging.FileHandler',
        #     'filename': BASE_DIR / 'django.log',
        #     'formatter': 'verbose',
        # },
    },
    'root': { # Logger raíz
        'handlers': ['console'],
        'level': config('ROOT_LOG_LEVEL', default='INFO'), # Nivel de log para la raíz (INFO es buen default en prod)
    },
    'loggers': { # Loggers específicos
        'django': { # Logger para Django
            'handlers': ['console'],
            'level': config('DJANGO_LOG_LEVEL', default='INFO'), # Nivel de log para Django (INFO es buen default en prod)
            'propagate': False, # No pasar logs de Django al logger raíz
        },
        'core': { # Ejemplo de logger para tu app 'core'
            'handlers': ['console'],
            'level': config('CORE_LOG_LEVEL', default='INFO'),
            'propagate': False,
        }
        # Define loggers para otras apps si es necesario
    },
}