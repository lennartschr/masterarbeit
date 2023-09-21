# Urls der App

from django.urls import path
from . import views

app_name = "webapp"
urlpatterns = [

    path("start", views.start, name="start"),
    # Startview
    path("", views.experiment, name="experiment"),
    # Informationen zum Datenschutz
    path("datenschutz", views.datenschutz, name="datenschutz"),
    # Kontrollfragen
    path("kontrolle", views.kontrolle, name="kontrolle"),
    # Webseite
    path("webseite", views.webseite, name="webseite"),


    # Startview B
    path("B", views.experimentB, name="experimentB"),
    # Informationen zum Datenschutz
    path("datenschutzB", views.datenschutzB, name="datenschutzB"),
    # Kontrollfragen
    path("kontrolleB", views.kontrolleB, name="kontrolleB"),
    # Webseite
    path("webseiteB", views.webseiteB, name="webseiteB"),



    # Webseite zum Testen von diversen Inhalten
    path("ZTest", views.ZTest, name="ZTest"),
    # Webseite zum Testen von diversen Inhalten
    path("ZTest2", views.ZTest2, name="ZTest2"),
]

# path('website' -> Aufruf im Browser,
#       views.website -> welche View unter der App "website" angezeigt werden soll,
#       name='website' -> Name der Website
#     )
