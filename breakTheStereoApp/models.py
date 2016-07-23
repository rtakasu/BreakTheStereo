from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Person(models.model):
  name = models.CharField()
  age = models.IntegerField()
  race = models.CharField()
  GENDER_CHOICES = (
    (MALE, 'Male'),
    (FEMALE,'Female'),
    (OTHER, 'Neither')
  )
  gender = models.CharField(
        choices = GENDER_CHOICES
  )
  region = models.CharField()

class Song(models.model):
  name = models.CharField()
  artist = models.CharField()
  genre = models.CharField()

  listeners = models.ManyToManyField(Person, through = 'Reaction')

class Reaction(models.model):
  person = models.ForeignKey(Person, on_delete=models.CASCADE)
  song = models.ForeignKey(Song, on_delete=models.CASCADE)
  emotion = models.CharField()
  created_at = models.DateTimeField('reacted at')

