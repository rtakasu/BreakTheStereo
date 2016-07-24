from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Person(models.Model):
  name = models.CharField(max_length = 100)
  age = models.IntegerField()
  race = models.CharField(max_length = 100)
  MALE = "MALE"
  FEMALE = "FEMALE"
  GENDER_CHOICES = (
    (MALE, 'Male'),
    (FEMALE,'Female'),
    ("Agender", "Agender"),
    ("Cis","Cis"),
    ("Trans","Trans"),
    ("Not Listed","Not Listed")
  )
  gender = models.CharField(
        choices = GENDER_CHOICES,
        max_length = 100
  )
  region = models.CharField(max_length = 100)
  profile_pic_url = models.CharField(default='http://static1.squarespace.com/static/549eea22e4b0d99a53dff15b/t/55119aa7e4b057ed57a2985f/1427217064918/',max_length = 500)

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

  smile = models.IntegerField(default=0)
  cry = models.IntegerField(default=0)
  angry = models.IntegerField(default=0)
  dance = models.IntegerField(default=0)
  chill = models.IntegerField(default=0)
  rock = models.IntegerField(default=0)
  romantic = models.IntegerField(default=0)
  # EMOTION_CHOICES = (
  #   ("smile","smile"),
  #   ("cry","cry"),
  #   ("angry","angry"),
  #   ("dance","dance"),
  #   ("chill","chill"),
  #   ("rock","rock"),
  #   ("romantic","romantic")
  # )
  # emotion = models.CharField(max_length = 100)
  created_at = models.DateTimeField('reacted at')
  def __str__(self):
    return "smiles: " + str(self.smile)

