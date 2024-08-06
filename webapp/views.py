import random
from django.utils import timezone
from django.shortcuts import render
from django.http import JsonResponse
from .models import Answers
from datetime import timedelta


# Studie
def experiment(request):
    if request.method == "GET":
        x_forw_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forw_for:
            ip_address = x_forw_for.split(",")[0]
        else:
            ip_address = request.META.get("REMOTE_ADDR")

        # Zufällige Experimentnummer zwischen 1 und 6
        # experimentNumber = random.randint(1, 6)
        # experimentNumber = 4

        # Experiment ohne Loss Aversion laufen lassen = Experiment 3 & 4 ausschließen:
        # Liste der erlaubten Experimentnummern
        allowed_experiment_numbers = [1, 2, 5, 6]

        # Zufällige Auswahl einer Experimentnummer aus der Liste
        experimentNumber = random.choice(allowed_experiment_numbers)
        # Experimentnummer ausgeben
        print("Gewählte Experimentnummer:", experimentNumber)

        # Experimentnummer in der VS-Konsole ausgeben
        print(f"Experimentnummer für IP {ip_address}: {experimentNumber}")

        # Zeitraum von 30 Minuten definieren
        lifetime_participant_dataset = timezone.now() - timedelta(minutes=30)

        # Überprüfen, ob ein Eintrag mit der gleichen IP-Adresse in den letzten 30 Minuten existiert
        recent_entry = Answers.objects.filter(
            ip_address=ip_address,
            created_at__gte=lifetime_participant_dataset,
        ).first()

        if recent_entry:
            # Aktualisieren des bestehenden Eintrags mit einer neuen Experimentnummer
            recent_entry.experimentNumber = experimentNumber
            recent_entry.save()
        else:
            # Neuen Eintrag erstellen, falls kein aktueller Eintrag existiert oder älter als 30 Minuten ist
            Answers.objects.create(
                ip_address=ip_address, experimentNumber=experimentNumber
            )

    return render(request, "experiment/experiment.html")


def datenschutz(request):
    return render(request, "experiment/datenschutz.html")


def kontrolle(request):
    return render(request, "experiment/kontrolle.html")


def ISP(request):
    x_forw_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forw_for:
        ip_address = x_forw_for.split(",")[0]
    else:
        ip_address = request.META.get("REMOTE_ADDR")

    # Experiment Number aus der Datenbank holen
    lifetime_participant_dataset = timezone.now() - timedelta(minutes=30)
    recent_entry = Answers.objects.filter(
        ip_address=ip_address,
        created_at__gte=lifetime_participant_dataset,
    ).first()

    experimentNumber = (
        recent_entry.experimentNumber if recent_entry else random.randint(1, 6)
    )

    context = {
        "experimentNumber": experimentNumber,
    }
    return render(request, "experiment/ISP.html", context)


def ISPkontrolle(request):
    return render(request, "experiment/ISPkontrolle.html")


# Abfrage Experimentnummer
def get_experiment_number(request):
    x_forw_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forw_for:
        ip_address = x_forw_for.split(",")[0]
    else:
        ip_address = request.META.get("REMOTE_ADDR")

    # Zeitraum von 30 Minuten definieren
    lifetime_participant_dataset = timezone.now() - timedelta(minutes=30)

    try:
        # Den neuesten Eintrag für diese IP-Adresse holen
        latest_answer = Answers.objects.filter(
            ip_address=ip_address,
            created_at__gte=lifetime_participant_dataset,
        ).latest("created_at")

        return JsonResponse({"experimentNumber": latest_answer.experimentNumber})
    except Answers.DoesNotExist:
        return JsonResponse({"experimentNumber": None})


# Login für Webseite
def login(request):
    if request.method == "POST":
        x_forw_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forw_for:
            ip_address = x_forw_for.split(",")[0]
        else:
            ip_address = request.META.get("REMOTE_ADDR")

        participantName = request.POST.get("participantName", "")
        participantGender = request.POST.get("participantGender", "")

        try:
            # Eintrag mit der gleichen IP-Adresse und innerhalb der letzten 30 Minuten finden
            lifetime_participant_dataset = timezone.now() - timedelta(minutes=30)
            latest_answer = Answers.objects.filter(
                ip_address=ip_address, created_at__gte=lifetime_participant_dataset
            ).latest("created_at")

            # Aktualisieren der Teilnehmerdaten
            latest_answer.participantName = participantName
            latest_answer.participantGender = participantGender
            latest_answer.save()

            return JsonResponse(
                {"message": "Teilnehmerdaten erfolgreich aktualisiert."}
            )
        except Answers.DoesNotExist:
            return JsonResponse({"message": "Teilnehmer nicht gefunden."})

    return render(request, "webseite/login.html")


# Hauptwebseite
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

            # Überprüfen, ob ein Eintrag mit der gleichen IP-Adresse, Name und Geschlecht in den letzten 30 Minuten existiert
            recent_entry = Answers.objects.filter(
                ip_address=ip_address,
                participantName=participantName,
                participantGender=participantGender,
                created_at__gte=lifetime_participant_dataset,
            ).first()

            if recent_entry:
                # Aktualisieren des letzten Eintrags, falls er innerhalb der letzten 30 Minuten erstellt wurde
                recent_entry.participantGender = participantGender
                recent_entry.experimentNumber = experimentNumber
                recent_entry.save()
                return JsonResponse(
                    {"message": "Teilnehmerdaten erfolgreich aktualisiert."}
                )
            else:
                # Neuen Eintrag erstellen, falls kein aktueller Eintrag existiert oder älter als 30 Minuten ist
                Answers.objects.create(
                    ip_address=ip_address,
                    participantName=participantName,
                    participantGender=participantGender,
                    experimentNumber=experimentNumber,
                )
                return JsonResponse(
                    {"message": "Neuer Teilnehmerdatensatz erfolgreich gespeichert."}
                )

        elif (
            "answer1" in request.POST
            or "answer2" in request.POST
            or "answer3" in request.POST
            or "answer4" in request.POST
        ):
            answer1 = request.POST.get("answer1")
            answer2 = request.POST.get("answer2")
            answer3 = request.POST.get("answer3")
            answer4 = request.POST.get("answer4")
            pdf_clicked = int(request.POST.get("pdf_clicked", 0))
            participantName = request.POST.get("participantName")

            try:
                # Eintrag für den Teilnehmer aktualisieren basierend auf Name und IP-Adresse
                latest_answer = Answers.objects.filter(
                    participantName=participantName, ip_address=ip_address
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
                    latest_answer.pdf_clicked = pdf_clicked
                    latest_answer.save()
                    return JsonResponse({"message": "Antwort erfolgreich gespeichert."})
                else:
                    return JsonResponse(
                        {
                            "message": "Eintrag ist älter als 30 Minuten, keine Aktualisierung erfolgt."
                        }
                    )

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

    # Dictionary zur Zuordnung des Titels basierend auf dem Geschlecht
    gender_titel_map = {
        "männlich": "Sehr geehrter",
        "weiblich": "Sehr geehrte",
        "divers": "Sehr geehrter/Sehr geehrte",
        "andere": "Sehr geehrter/Sehr geehrte",
    }

    # Standardanreden, falls das Geschlecht nicht im Dictionary enthalten ist
    participantGender_speech = gender_speech_map.get(
        latest_answer.participantGender, "Herr/Frau"
    )
    participantGender_titel = gender_titel_map.get(
        latest_answer.participantGender, "Sehr geehrter/Sehr geehrte"
    )

    context = {
        "participantName": latest_answer.participantName,
        "participantNameWithSuffix": participant_name_with_suffix,
        "participantGender": latest_answer.participantGender,
        "participantGender_speech": participantGender_speech,
        "participantGender_titel": participantGender_titel,
    }

    return render(request, "webseite/webseite.html", context)


# Update install status
def update_install_status(request):
    if request.method == "POST":
        participantName = request.POST.get("participantName", "")
        ip_address = request.META.get("REMOTE_ADDR", "")

        try:
            # Eintrag für den Teilnehmer aktualisieren basierend auf Name und IP-Adresse
            latest_answer = Answers.objects.filter(
                participantName=participantName, ip_address=ip_address
            ).latest("created_at")

            if timezone.now() - latest_answer.created_at < timedelta(minutes=30):
                latest_answer.installed_update = 1
                latest_answer.save()
                return JsonResponse(
                    {"message": "Installationsstatus erfolgreich aktualisiert."}
                )
            else:
                return JsonResponse(
                    {
                        "message": "Eintrag ist älter als 30 Minuten, keine Aktualisierung erfolgt."
                    }
                )

        except Answers.DoesNotExist:
            return JsonResponse({"message": "Teilnehmer nicht gefunden."})

    return JsonResponse({"message": "Ungültige Anfrage."})


def ZTest(request):
    return render(request, "webseite/ZTest.html")
