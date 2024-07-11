from django.utils import timezone
from django.shortcuts import render
from django.http import JsonResponse
from .models import Answers
from datetime import timedelta


# Create your views here.
# Wiedergabe der Views und deren Code/Inhalt unter dem Reiter "templates"


#  Choose Experiment
def start(request):
    return render(request, "experiment/start.html")


# Experiment 1
def experiment(request):
    return render(request, "experiment/experiment.html")


def datenschutz(request):
    return render(request, "experiment/datenschutz.html")


def kontrolle(request):
    return render(request, "experiment/kontrolle.html")


def login(request):
    return render(request, "webseite/login.html")


def webseite(request):
    if request.method == "POST":
        x_forw_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forw_for:
            ip_address = x_forw_for.split(",")[0]
        else:
            ip_address = request.META.get("REMOTE_ADDR")

        if "participantName" in request.POST and "participantGender" in request.POST:
            participantName = request.POST.get("participantName", "")
            participantGender = request.POST.get("participantGender", "")
            experimentNumber = request.POST.get("experimentNumber", 0)

            # Zeitraum von 30 Minuten definieren
            lifetime_participant_dataset = timezone.now() - timedelta(minutes=30)

            # Überprüfen, ob ein Eintrag mit der gleichen IP-Adresse, Name und Geschlecht in den letzten 1 Minute existiert
            recent_entry = Answers.objects.filter(
                ip_address=ip_address,
                participantName=participantName,
                participantGender=participantGender,
                created_at__gte=lifetime_participant_dataset
            ).first()

            if recent_entry:
                # Aktualisieren des letzten Eintrags, falls er innerhalb der letzten 30 Minuten erstellt wurde
                # Nach 30 Minuten kann der Datensatz nicht mehr verändert werden
                recent_entry.participantGender = participantGender
                recent_entry.experimentNumber = experimentNumber
                recent_entry.save()
                return JsonResponse({"message": "Teilnehmerdaten erfolgreich aktualisiert."})
            else:
                # Neuen Eintrag erstellen, falls kein aktueller Eintrag existiert oder älter als 30 Minute ist
                Answers.objects.create(
                    ip_address=ip_address,
                    participantName=participantName,
                    participantGender=participantGender,
                    experimentNumber=experimentNumber,
                )
                return JsonResponse({"message": "Neuer Teilnehmerdatensatz erfolgreich gespeichert."})

        elif "answer1" in request.POST or "answer2" in request.POST or "answer3" in request.POST or "answer4" in request.POST:
            answer1 = request.POST.get("answer1")
            answer2 = request.POST.get("answer2")
            answer3 = request.POST.get("answer3")
            answer4 = request.POST.get("answer4")
            participantName = request.POST.get("participantName")
            answer2_pdf = int(request.POST.get("answer2_pdf", 0))


            try:
                # Eintrag für den Teilnehmer aktualisieren basierend auf Name und IP-Adresse
                latest_answer = Answers.objects.filter(
                    participantName=participantName,
                    ip_address=ip_address
                ).latest("created_at")

                if timezone.now() - latest_answer.created_at < timedelta(minutes=30):
                    if answer1:
                        latest_answer.answer1 = answer1
                    if answer2:
                        latest_answer.answer2 = answer2
                    if answer3:
                        latest_answer.answer3 = answer3
                    if answer4:
                        latest_answer.answer4 = answer4
                    latest_answer.answer2_pdf = answer2_pdf
                    latest_answer.save()
                    return JsonResponse({"message": "Antwort erfolgreich gespeichert."})
                else:
                    return JsonResponse({"message": "Eintrag ist älter als 30 Minuten, keine Aktualisierung erfolgt."})
                
            except Answers.DoesNotExist:
                return JsonResponse({"message": "Teilnehmer nicht gefunden."})

    try:
        # Versuchen, den neuesten Eintrag zu holen
        latest_answer = Answers.objects.latest("created_at")
    except Answers.DoesNotExist:
        # Wenn kein Eintrag vorhanden ist, erstellen wir einen neuen Dummy-Eintrag
        latest_answer = Answers.objects.create(
            ip_address="dummy_ip",
            participantName="Dummy",
            participantGender="divers",
            experimentNumber=0,
        )

    # Zeitstempel in lokale Zeit umwandeln
    latest_answer.created_at = timezone.localtime()

    # Namen austauschen
    participant_name_with_suffix = (
        latest_answer.participantName.lower() + "@vitanova.com"
    )

    # Dictionary zur Zuordnung der Anrede basierend auf dem Geschlecht
    gender_speech_map = {
        "männlich": "Herr",
        "weiblich": "Frau",
        "divers": "Herr/Frau",
        "andere": "Herr/Frau",
    }

    # Standardanrede, falls das Geschlecht nicht im Dictionary enthalten ist
    participantGender_speech = gender_speech_map.get(
        latest_answer.participantGender, "Herr/Frau"
    )

    context = {
        "participantName": latest_answer.participantName,
        "participantNameWithSuffix": participant_name_with_suffix,
        "participantGender": latest_answer.participantGender,
        "participantGender_speech": participantGender_speech,
    }
    
    return render(request, "webseite/webseite.html", context)

    # Daten an Frontend zurück übergeben
    # all_items = answers.objects.all() # Alle informationen der Datenbank ausgeben
    # specific_item = answers.objects.get(id=1) # Oder spezifisch - bspw. das Erste Element
    # specific_item2 = answers.objects.filter(participantName='Hallo') # Oder spezifisch - bspw. bestimmter Inhalt

    # return render(request, "webseite/ZTest.html", {'Antworten_Gesamt': all_items}) # Ausgabe einer Variable aus dem Backend zurück ans Frontend


# Experiment 2
def experimentB(request):
    return render(request, "experiment/experimentB.html")


def datenschutzB(request):
    return render(request, "experiment/datenschutzB.html")


def kontrolleB(request):
    return render(request, "experiment/kontrolleB.html")


def webseiteAdler(request):
    # if request.method == "POST":
    #     x_forw_for = request.META.get("HTTP_X_FORWARDED_FOR")
    #     if x_forw_for:
    #         ip_address = x_forw_for.split(",")[0]
    #     else:
    #         ip_address = request.META.get("REMOTE_ADDR")

    #     if "participantName" in request.POST and "participantGender" in request.POST:
    #         participantName = request.POST.get("participantName", "")
    #         participantGender = request.POST.get("participantGender", "")
    #         experimentNumber = request.POST.get("experimentNumber", 0)

    #         # Neuen Teilnehmerdatensatz erstellen oder vorhandenen aktualisieren
    #         Answers.objects.update_or_create(
    #             ip_address=ip_address,
    #             participantName=participantName,
    #             participantGender=participantGender,
    #             defaults={
    #                 "participantGender": participantGender,
    #                 "experimentNumber": experimentNumber,
    #             },
    #         )

    #         return render(
    #             request,
    #             "webseite/webseite.html",
    #             {"message": "Teilnehmerdaten erfolgreich gespeichert."},
    #         )

    #     elif "answer1" in request.POST or "answer4" in request.POST:
    #         answer1 = request.POST.get("answer1")
    #         answer4 = request.POST.get("answer4")
    #         participantName = request.POST.get("participantName")

    #         try:
    #             # Eintrag für den Teilnehmer aktualisieren basierend auf Name und IP-Adresse
    #             latest_answer = Answers.objects.get(
    #                 participantName=participantName, ip_address=ip_address
    #             )
    #             if answer1:
    #                 latest_answer.answer1 = answer1
    #             if answer4:
    #                 latest_answer.answer4 = answer4
    #             latest_answer.save()

    #             return render(
    #                 request,
    #                 "webseite/webseite.html",
    #                 {"message": "Antwort erfolgreich gespeichert."},
    #             )
    #         except Answers.DoesNotExist:
    #             return render(
    #                 request,
    #                 "webseite/webseite.html",
    #                 {"message": "Teilnehmer nicht gefunden."},
    #             )

    # # Namen austauschen
    # latest_answer = Answers.objects.latest("created_at")
    # participant_name_with_suffix = (
    #     latest_answer.participantName.lower() + "@vitanova.com"
    # )

    # # Dictionary zur Zuordnung der Anrede basierend auf dem Geschlecht
    # gender_speech_map = {
    #     "männlich": "Herr",
    #     "weiblich": "Frau",
    #     "divers": "Herr/Frau",
    #     "andere": "Herr/Frau",
    # }

    # # Standardanrede, falls das Geschlecht nicht im Dictionary enthalten ist
    # participantGender_speech = gender_speech_map.get(
    #     latest_answer.participantGender, "Herr/Frau"
    # )

    # context = {
    #     "participantName": latest_answer.participantName,
    #     "participantNameWithSuffix": participant_name_with_suffix,
    #     "participantGender": latest_answer.participantGender,
    #     "participantGender_speech": participantGender_speech,
    # }
    return render(request, "webseite/webseiteAdler.html")


# Testen
def ZTest(request):
    return render(request, "webseite/ZTest.html")
