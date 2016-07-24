from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Person(models.Model):
  name = models.CharField(max_length = 100)
  age = models.IntegerField()
  race = models.CharField(max_length = 100)
  MALE = "MALE"
  FEMALE = "FEMALE"
  OTHER = "OTHER"
  GENDER_CHOICES = (
    (MALE, 'Male'),
    (FEMALE,'Female'),
    (OTHER, 'Neither')
  )
  gender = models.CharField(
        choices = GENDER_CHOICES,
        max_length = 100
  )
  region = models.CharField(max_length = 100)

  def __str__(self):
    return self.name

class Song(models.Model):
  name = models.CharField(max_length = 100)
  artist = models.CharField(max_length = 100)
  genre = models.CharField(max_length = 100)

  listeners = models.ManyToManyField(Person, through = 'Reaction')
  def __str__(self):
    return self.name

class Reaction(models.Model):
  person = models.ForeignKey(Person, on_delete=models.CASCADE)
  song = models.ForeignKey(Song, on_delete=models.CASCADE)
  EMOTION_CHOICES = (
    ("smile","smile"),
    ("cry","cry"),
    ("angry","angry"),
    ("dance","dance"),
    ("chill","chill"),
    ("rock","rock"),
    ("romantic","romantic")
  )
  emotion = models.CharField(max_length = 100)
  created_at = models.DateTimeField('reacted at')
  def __str__(self):
    return self.emotion

