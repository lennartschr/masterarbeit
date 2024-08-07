# Urls der App

from django.urls import path
from . import views
from .views import get_experiment_number

app_name = "webapp"
urlpatterns = [

    # Start
    # Startview
    path("", views.experiment, name="experiment"),
    # Informationen zum Datenschutz
    path("datenschutz", views.datenschutz, name="datenschutz"),
    # Kontrollfragen
    path("kontrolle", views.kontrolle, name="kontrolle"),
    # ISP
    path("ISP", views.ISP, name="ISP"),
    # ISP Kontrollfragen
    path("ISPkontrolle", views.ISPkontrolle, name="ISPkontrolle"),


    # Webseite
    # Login
    path("login", views.login, name="login"),
    # Website
    path("webseite", views.webseite, name="webseite"),

    # Sonstiges
    # Experiment-Nummer
    path('get_experiment_number/', views.get_experiment_number, name='get_experiment_number'),
    # Namen und Geschlecht eintragen
    path('update_participant_data/', views.update_participant_data, name='update_participant_data'),
    # Mails abspeichern
    path('update_answer/', views.update_answer, name='update_answer'),
    # Update_Status
    path('update_install_status/', views.update_install_status, name='update_install_status'),
    # Website zum Testen von diversen Inhalten
    path("ZTest", views.ZTest, name="ZTest"),
]

# path('website' -> Aufruf im Browser,
#       views.website -> welche View unter der App "website" angezeigt werden soll,
#       name='website' -> Name der Website
#     )
