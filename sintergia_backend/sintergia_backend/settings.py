import os
import dj_database_url
from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
# En producción, este valor debe ser tomado de variables de entorno
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure--z*jv3$l3m$_mprv9(@0njsfg08qifdi)$wqls2z7rsox$uyf5')

# SECURITY WARNING: don't run with debug turned on in production!
# En producción, Debug debe estar en False
# Corregido: Usar .lower() == 'true' para comparar el string 'True'/'False' sin importar mayúsculas.
DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'

# Configurar hosts permitidos para producción
# Nota: Esta lista contiene hostnames (sin http/https).
# Hardcodear el hostname de producción aquí funciona, pero ten en cuenta que NO permitirá el desarrollo local (localhost, 127.0.0.1)
# a menos que DEBUG = True y tu lógica de ALLOWED_HOSTS lo maneje, o añadas esos hosts aquí manualmente para desarrollo.
ALLOWED_HOSTS = ['sintergia.onrender.com']


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'core',  # App core
    'rest_framework',  # DRF para APIs
    'corsheaders',
    'whitenoise.runserver_nostatic',  # Para servir archivos estáticos en desarrollo con runserver
    'whitenoise', # Añadido: Necesario para que Whitenoise funcione correctamente
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Añadido: Middleware de Whitenoise para servir archivos estáticos en producción
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
                'django.template.context_processors.messages',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'sintergia_backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

# Configuración condicional de la base de datos
if 'DATABASE_URL' in os.environ:
    # Configuración para producción con Render
    DATABASES = {
        'default': dj_database_url.config(
            conn_max_age=600,
            conn_health_checks=True,
        )
    }
else:
    # Configuración para desarrollo local
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'sintergia_db',
            'USER': 'sintergia',
            'PASSWORD': '200288',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }


# Password validation
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


# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Configuración de Whitenoise para archivos estáticos
# Eliminadas: WHITENOISE_USE_FINDERS, WHITENOISE_MANIFEST_STRICT, WHITENOISE_ALLOW_ALL_ORIGINS
# Estas configuraciones son para versiones antiguas de Whitenoise (3.x) y ya no se usan en versiones recientes.

# Comprimir archivos estáticos para mejor rendimiento
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Configuración CORS para permitir solicitudes desde el frontend en Vercel
# Asegúrate de que las URLs en esta lista NO tengan barras '/' al final ni paths.
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Desarrollo local
    "https://sintergia.vercel.app",  # Reemplaza con tu dominio en Vercel (sin / al final)
]

# Permitir credenciales en solicitudes CORS (si es necesario)
CORS_ALLOW_CREDENTIALS = True

# Configuración JWT
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# Configuración de archivos de medios
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Nota sobre MEDIA_ROOT en producción: Los archivos subidos aquí no persistirán en Render.
# Necesitarías almacenamiento en la nube (S3, etc.) para persistencia en producción.


# Configuración de seguridad para producción
if not DEBUG:
    # HTTPS settings
    SECURE_SSL_REDIRECT = True # Asegúrate de que tu proveedor de hosting maneje HTTPS
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

    # HSTS settings
    SECURE_HSTS_SECONDS = 31536000  # 1 año
    SECURE_HSTS_PRELOAD = True
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True

    # Opcional: Configurar un email para recibir notificaciones de errores 500 en producción
    # ADMINS = [('Your Name', 'your_email@example.com')]
    # SERVER_EMAIL = 'your_server_email@example.com'
    # Esto requiere configuración adicional de email backend.