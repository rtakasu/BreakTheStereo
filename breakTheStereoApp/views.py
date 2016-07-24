from django.shortcuts import render,get_object_or_404, redirect
from django.http import HttpResponse
from django.template import loader

from .models import Song,Person,Reaction
from django.utils import timezone
import json
from django.core import serializers
from django.http import JsonResponse
# Create your views here.
def index(request):
  songs = Song.objects.all()
  #template = loader.get_template('breakTheStereoApp/index.html')
  #names = ','.join([song.name for song in songs])
  #if songs:
  #  return HttpResponse("breakTheStereo Y'all <br>" + names)
  #else:
  #  return HttpResponse("breakTheStereo Y'all: <br>" + "No songs found")
  context = {
    'songs' : songs,
  }
  #return HttpResponse(template.render(context,request))
  return render(request, 'breakTheStereoApp/index.html',context)
def profile(request,person_id):
  try:
    person = Person.objects.get(pk = person_id)
  except Person.DoesNotExist:
    raise Http404("Person does not exist")

    #This should be changed to a template
  return HttpResponse("Profile info will go here: %s" % person_id)

def addReaction(request):
  if request.method == "POST":
    print "request.post is",request.POST

    person = get_object_or_404(Person,pk = request.POST["person"])
    song = get_object_or_404(Song,pk = request.POST["song"])
    emotion_name = request.POST["emotion"]
    reaction = Reaction(song= song, person= person,emotion=emotion_name,created_at= timezone.now())
    reaction.save()
    #return HttpResponse(json.dumps({'name': name}), content_type="application/json")
    return HttpResponse(status=201)
  else:
    return redirect("/bts")

# Gets Reaction History
def reactionHistory(request):
  if request.method == "GET":
    person = get_object_or_404(Person,pk = request.GET["person"])
    song = get_object_or_404(Song,pk = request.GET["song"])
    reactions = person.reaction_set.filter(song_id=song.id)
    rz = {}
    for i in range(len(reactions)):
      r = reactions[i]
      rz[i] = {"emotion": r.emotion,"song_id":r.song_id,"person_id":r.person_id}
    return JsonResponse(rz)

# Get "Stats/demographics" for song
AGE_RANGE = 5

def differentDemoScore(person,other):
  score = 0
  if person.name != other.name:
    score += 1
  if abs(person.age - other.age) > AGE_RANGE:
    score += 1
  if person.race != other.race:
    score += 1
  if person.gender != other.gender:
    score += 1
  if person.region != other.region:
    score += 1
  return score

def similarMusicScore(person,other):
  score = 0
  songs = person.song_set.distinct()
  # for each song that person 1 has listened to, compare person 1's reactions against person 2's
  for song in songs:
    personReactions = song.reaction_set.all().filter(person_id = person.id)
    otherReactions = song.reaction_set.all().filter(person_id = other.id)

  if

# Get Suggested/similar users
def similar(request):
  #Create distance score between user and other users
  others = Person.objects.all().exclude(pk=request.GET["person"])






