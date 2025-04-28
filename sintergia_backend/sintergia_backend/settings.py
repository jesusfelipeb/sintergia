import os
import dj_database_url  # Importamos la librería para configurar la base de datos desde una URL
import environ
from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# --- Configuración de Seguridad y Producción ---

env = environ.Env()

# Leer el archivo .env adecuado
if os.getenv('DJANGO_ENV') == 'production':
    # Cargar variables de producción
    environ.Env.read_env(os.path.join(BASE_DIR, '.env.production'))
else:
    # Cargar variables de desarrollo
    environ.Env.read_env(os.path.join(BASE_DIR, '.env.local'))

# Este valor de respaldo solo se usará si la variable de entorno 'SECRET_KEY' NO está definida (ej: en desarrollo local si no usas un .env).
SECRET_KEY = os.environ.get('SECRET_KEY', '4pg&ocfm8lf(2(03m8wf6=-91h38z0ke-qwha4mf!')  # <-- Reemplaza por tu segunda clave segura generada

DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'

ALLOWED_HOSTS = [
    'https://sintergia.onrender.com',
    'sintergia.vercel.app',
]

RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

if DEBUG:
    ALLOWED_HOSTS.append('localhost')
    ALLOWED_HOSTS.append('127.0.0.1')
    # Puedes añadir otros hosts de desarrollo local si los usas aquí.

# Si usas un dominio personalizado con Render, también deberás añadirlo aquí manualmente
# (ej: ALLOWED_HOSTS.append('tudominio.com')) O leerlo de otra variable de entorno si prefieres.
# **¡Importante!** NO uses ALLOWED_HOSTS = ['*'] en producción - es una vulnerabilidad de seguridad.


# --- Definición de Aplicaciones ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',  # Django's default static file handling

    'core',  # Tu app core
    'rest_framework',  # Django Rest Framework
    'corsheaders',  # Django CORS Headers

    'whitenoise.runserver_nostatic',  # Asegura que runserver de Django sirva estáticos en desarrollo
    'whitenoise',  # Esencial para servir estáticos en producción con Whitenoise.

    # Añade aquí otras apps que usas.
    # 'rest_framework_simplejwt.token_blacklist',  # Necesario si usas BLACKLIST_AFTER_ROTATION = True en Simple JWT
]

# --- Configuración de Middleware ---
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Middleware de Whitenoise para servir estáticos

    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # CORS generalmente antes de CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'sintergia_backend.urls'  # Asegúrate de que 'sintergia_backend' es el nombre de tu proyecto

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # Puedes añadir directorios de templates globales aquí si los tienes
        'APP_DIRS': True,  # Permite a Django buscar templates en subcarpetas 'templates' de tus apps
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',  # Este debe estar presente (solo una vez).
            ],
        },
    },
]

WSGI_APPLICATION = 'sintergia_backend.wsgi.application'  # Asegúrate de que 'sintergia_backend' es el nombre de tu proyecto


# --- Configuración de Base de Datos ---
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
            'ENGINE': 'django.db.backends.postgresql',  # O el motor que uses localmente
            'NAME': 'sintergia_db',  # Nombre de la base de datos LOCAL
            'USER': 'sintergia',  # Nombre del usuario LOCAL
            'PASSWORD': '200288',  # Contraseña del usuario LOCAL
            'HOST': 'localhost',  # Host LOCAL (o '127.0.0.1')
            'PORT': '5432',  # Puerto LOCAL
        }
    }

# --- Validación de Contraseña ---
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
LANGUAGE_CODE = 'en-us'  # Idioma por defecto

TIME_ZONE = 'UTC'  # Zona horaria por defecto.

USE_I18N = True  # Habilita el sistema de traducción de Django

USE_TZ = True  # Usar zonas horarias conscientes (recomendado)


# --- Archivos Estáticos (CSS, JavaScript, Imágenes) ---
STATIC_URL = 'static/'  # URL base para acceder a los archivos estáticos

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Storage backend para archivos estáticos. Whitenoise maneja este backend que automáticamente comprime los archivos.
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# --- Archivos de Medios (Uploaded Files por usuarios) ---
MEDIA_URL = '/media/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# --- Configuración de CORS ---
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Desarrollo local
    "sintergia.vercel.app",
    f"https://{os.getenv('NEXT_PUBLIC_FRONTEND_DOMAIN')}",  # <-- Tu dominio en Vercel
]

CORS_ALLOW_CREDENTIALS = True

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
