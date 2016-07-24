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

def addSong(request):
  if request.method == "POST":
    song = False
    try:
      song = Song.objects.get(pk = request.POST['song'])
    except:
      song = Song(pk = int(request.POST['song']), name = request.POST["name"], artist = request.POST["artist"], genre= request.POST["genre"])
    if song:
      song.save()
      return HttpResponse(status=201)
    else:
      return Http404("Invalid Song")
  else:
    return redirect("/bts")

def addReaction(request):
  if request.method == "POST":

    person = get_object_or_404(Person,pk = request.POST["person"])
    song = get_object_or_404(Song,pk = request.POST["song"])
    emotion_name = request.POST["emotion"]
    reaction = False
    try:
      reaction = Reaction.objects.get(person_id = person.id, song_id = song.id)
    except:
      reaction = Reaction(song= song, person= person,created_at= timezone.now())
    # EMOTION_CHOICES = (
    #   ("smile","smile"),
    #   ("cry","cry"),
    #   ("angry","angry"),
    #   ("dance","dance"),
    #   ("chill","chill"),
    #   ("rock","rock"),
    #   ("romantic","romantic")
    # )
    if reaction:
      if emotion_name == "smile":
        reaction.smile += 1
      elif emotion_name == "cry":
        reaction.cry += 1
      elif emotion_name == "angry":
        reaction.angry += 1
      elif emotion_name == "dance":
        reaction.dance += 1
      elif emotion_name == "chill":
        reaction.chill += 1
      elif emotion_name == "rock":
        reaction.rock += 1
      elif emotion_name == "romantic":
        reaction.romantic += 1
    
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
    r = person.reaction_set.filter(song_id=song.id)[0]
    reaction = {"smile":r.smile,"cry":r.cry,"angry":r.angry,"dance":r.dance,"rock":r.rock,"chill":r.chill,"romantic":r.romantic}
    return JsonResponse(reaction)

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

#Returns normalized array of [smile,cry,angry,dance,rock,chill,romantic]
def normalizedArray(reaction):
  arr = [reaction.smile,reaction.cry,reaction.angry,reaction.dance,reaction.rock,reaction.chill,reaction.romantic]
  total = sum(arr)
  for i in range(len(arr)):
    arr[i] = float(arr[i])/float(total)
  return arr


def similarMusicScore(person,other):
  score = 0
  songs = person.song_set.distinct()
  # for each song that person 1 has listened to, compare person 1's reactions against person 2's
  for song in songs:
    personReaction = song.reaction_set.all().filter(person_id = person.id)[0]
    otherReaction = song.reaction_set.all().filter(person_id = other.id)[0]
    pArray = normalizedArray(personReaction)
    oArray = normalizedArray(otherReaction)
    diff = sum([ abs(pArray[i]-oArray[i]) for i in range(len(pArray))])
    score += diff
  return score


# Get Suggested/similar users
def similar(request):
  #Create distance score between user and other users
  person = Person.objects.get(pk=request.GET["person"])
  others = Person.objects.all().exclude(pk=request.GET["person"])
  scores = []
  for other in others:
    similarScore = differentDemoScore(person,other) - similarMusicScore(person,other)
    scores.append((other,similarScore))

  ordered = sorted(scores, key=lambda x: x[1])
  #return top 5

  topFive = list(reversed(ordered[-5:]))

  jsonRes = {}
  for i in range(len(topFive)):
    p = topFive[i][0]
    jsonRes[i] = {"name":p.name,"age":p.age,"gender":p.gender,"race":p.race,"region":p.region}
  return JsonResponse(jsonRes)









