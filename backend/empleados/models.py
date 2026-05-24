from django.db import models

class Empleado(models.Model):

    nombre = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100)
    salario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre