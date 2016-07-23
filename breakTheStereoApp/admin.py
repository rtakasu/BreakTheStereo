from django.contrib import admin

# Register your models here.
from .models import Person,Song,Reaction

admin.site.register(Person)
admin.site.register(Song)
admin.site.register(Reaction)