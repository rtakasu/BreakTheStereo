from django.shortcuts import render,get_object_or_404, redirect
from django.http import HttpResponse
from django.template import loader

from .models import Song,Person,Reaction
from django.utils import timezone
import json
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

