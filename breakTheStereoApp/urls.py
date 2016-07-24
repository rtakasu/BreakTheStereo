from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<person_id>[0-9]+)/$',views.profile, name= "profile"),
    url(r'^addReaction/$',views.addReaction,name= "addReaction"),
    url(r'^history/$',views.reactionHistory,name= "history"),
    url(r'^similar/$',views.similar,name= "similar"),
    url(r'^addSong/$',views.addSong,name= "addSong")
]