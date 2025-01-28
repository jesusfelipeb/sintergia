from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Servicio
from .serializers import ServicioSerializer

class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
