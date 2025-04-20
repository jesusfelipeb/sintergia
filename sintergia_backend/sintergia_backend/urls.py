from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static


# Importaciones de vistas
from core.views import (
    ServicioViewSet, 
    ProyectoViewSet, 
    home,
)

# view del formulario
from core.views import guardar_contacto

# Configuración del router para las APIs REST
router = DefaultRouter()
router.register(r'servicios', ServicioViewSet)
router.register(r'proyectos', ProyectoViewSet)  # Nueva API de proyectos

# Autenticación de administradores
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Personaliza el token para incluir información adicional del usuario"""
    def validate(self, attrs):
        data = super().validate(attrs)
        data['is_admin'] = self.user.is_staff  # Indica si el usuario es admin
        return data

from rest_framework_simplejwt.views import TokenObtainPairView

class AdminTokenObtainPairView(TokenObtainPairView):
    """Solo permite que administradores obtengan tokens"""
    serializer_class = AdminTokenObtainPairSerializer
    permission_classes = [IsAdminUser]  # Restringe a usuarios con is_staff=True

# Definición de las rutas del proyecto
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # API para el frontend
    path('api/home/', home, name='home'),
    path('api/admin/token/', AdminTokenObtainPairView.as_view(), name='admin_token_obtain_pair'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/contacto/', guardar_contacto, name='guardar_contacto'),  # Formulario de contacto
] 

# Configuración para servir archivos de medios en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

