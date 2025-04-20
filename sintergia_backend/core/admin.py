from django.contrib import admin
from .models import Contacto, Proyecto, Servicio  # Agregamos Proyecto y Servicio si lo deseas

admin.site.register(Contacto)
admin.site.register(Proyecto)  # Registrar Proyecto para poder gestionarlo en el admin
admin.site.register(Servicio)  # Opcional: registra también Servicio si lo necesitas
