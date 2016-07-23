from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import Song,Person
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