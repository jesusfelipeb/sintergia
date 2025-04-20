from django.db import models

# Create your models here.
# SERVICIOS
class Servicio(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    creado_en = models.DateTimeField(auto_now_add=True)

#PORTAFOLIO
class Proyecto(models.Model):
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='proyectos/', blank=True, null=True)  # Se guardarán en /media/proyectos/
    enlace = models.URLField(blank=True, null=True)  # Opcional, si hay un link al proyecto
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo
    
#Formulario
class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    telefono = models.CharField(max_length=15, blank=True, null=True)
    mensaje = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre