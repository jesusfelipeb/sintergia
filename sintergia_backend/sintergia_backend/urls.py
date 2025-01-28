from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import ServicioViewSet

router = DefaultRouter()
router.register(r'servicios', ServicioViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # API para frontend
]
