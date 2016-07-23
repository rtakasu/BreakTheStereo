from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<person_id>[0-9]+)/$',views.profile, name= "profile")
]