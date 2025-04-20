from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser  # Importación corregida
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

from .models import Servicio, Proyecto, Contacto
from .serializers import ServicioSerializer, ProyectoSerializer, ContactoSerializer

# HOME

from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(['GET'])
def home(request):
    return JsonResponse({'message': 'API funcionando correctamente'})


# Servicios
class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer


# Portafolio
class ProyectoViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer
    permission_classes = [AllowAny]  # Permite el acceso público


# Endpoint para autenticación de SuperUsuarios
class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        if not self.user.is_staff:  # Verifica si es administrador
            raise serializers.ValidationError("No tienes permiso para acceder.")
        return data


class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdminTokenObtainPairSerializer
    permission_classes = [IsAdminUser]  # ✅ Ahora correctamente importado


# Manejar formulario de contacto
@api_view(['POST'])
def guardar_contacto(request):
    serializer = ContactoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Formulario enviado con éxito'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
