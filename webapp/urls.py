# Urls der App

from django.urls import path
from . import views

app_name = "webapp"
urlpatterns = [
    # Choose Experiment
    path("", views.start, name="start"),

    # Startview
    path("A", views.experiment, name="experiment"),
    # Informationen zum Datenschutz
    path("datenschutz", views.datenschutz, name="datenschutz"),
    # Kontrollfragen
    path("kontrolle", views.kontrolle, name="kontrolle"),
    # Login
    path("login", views.login, name="login"),
    # Website
    path("webseite", views.webseite, name="webseite"),


    # Startview B
    path("B", views.experimentB, name="experimentB"),
    # Informationen zum Datenschutz
    path("datenschutzB", views.datenschutzB, name="datenschutzB"),
    # Kontrollfragen
    path("kontrolleB", views.kontrolleB, name="kontrolleB"),
    # Website
    path("webseiteAdler", views.webseiteAdler, name="webseiteAdler"),


    # Website zum Testen von diversen Inhalten
    path("ZTest", views.ZTest, name="ZTest"),
]

# path('website' -> Aufruf im Browser,
#       views.website -> welche View unter der App "website" angezeigt werden soll,
#       name='website' -> Name der Website
#     )
