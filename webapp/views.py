import random
import json
from django.utils import timezone
from django.shortcuts import render
from django.http import JsonResponse
from .models import Answers
from datetime import timedelta
from django.views.decorators.csrf import csrf_exempt


# Studie
def experiment(request):
    # Stelle sicher, dass die Session initialisiert wird
    request.session.save()

    # Um die IP Adresse auszulesen
    x_forw_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forw_for:
        ip_address = x_forw_for.split(",")[0]
    else:
        ip_address = request.META.get("REMOTE_ADDR")

    # Experimentnummer zufällig auswählen, falls nicht in der Session gespeichert
    allowed_experiment_numbers = [1, 2, 5, 6]
    if "experimentNumber" not in request.session:
        experimentNumber = random.choice(allowed_experiment_numbers)
        request.session["experimentNumber"] = experimentNumber
    else:
        experimentNumber = request.session["experimentNumber"]

    # Erstelle oder aktualisiere ein Answers-Objekt für diese Session
    try:
        answer = Answers.objects.get(id=request.session.get("answer_id"))
        answer.ip_address = ip_address
        answer.experimentNumber = experimentNumber
        answer.save()
    except Answers.DoesNotExist:
        answer = Answers.objects.create(
            session_id=request.session.session_key,
            ip_address=ip_address,
            created_at=timezone.now(),
            experimentNumber=experimentNumber,
        )
        request.session["answer_id"] = answer.id

    # Experimentnummer ausgeben
    print("Gewählte Experimentnummer:", experimentNumber)
    print(f"Experimentnummer für IP {ip_address}: {experimentNumber}")

    # Daten für das Template bereitstellen
    context = {
        "experimentNumber": experimentNumber,
        "ip_address": ip_address,
        "answer": answer,
    }

    # Rendern der Vorlage
    return render(request, "experiment/experiment.html", context)


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
            actualSession = Answers.objects.filter(
                ip_address=ip_address, created_at__gte=lifetime_participant_dataset
            ).latest("created_at")

            # Aktualisieren der Teilnehmerdaten
            actualSession.participantName = participantName
            actualSession.participantGender = participantGender
            actualSession.save()

            return JsonResponse(
                {"message": "Teilnehmerdaten erfolgreich aktualisiert."}
            )
        except Answers.DoesNotExist:
            return JsonResponse({"message": "Teilnehmer nicht gefunden."})

    return render(request, "webseite/login.html")


# Hauptwebseite
def webseite(request):

    # Stelle sicher, dass die Session initialisiert wird
    request.session.save()

    # Prüfe, ob die Antwort-ID in der Session vorhanden ist
    answer_id = request.session.get("answer_id")

    # Standardwerte setzen
    participant_name = "Teilnehmer"
    participant_gender_speech = "Teilnehmer/in"
    participant_gender_titel = "Sehr geehrter/Sehr geehrte"
    participant_name_with_suffix = "teilnehmer@vitanova.com"

    if answer_id:
        try:
            # Antworten aus der Datenbank abrufen
            answer = Answers.objects.get(id=answer_id)
            participant_name = answer.participantName

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

            # Anrede und Titel basierend auf dem Geschlecht bestimmen
            participant_gender_speech = gender_speech_map.get(
                answer.participantGender, "Teilnehmer/in"
            )
            participant_gender_titel = gender_titel_map.get(
                answer.participantGender, "Sehr geehrter/Sehr geehrte"
            )

            # Generiere den Namen mit dem Suffix
            participant_name_with_suffix = f"{participant_name.lower()}@vitanova.com"

        except Answers.DoesNotExist:
            # Falls keine Antwort gefunden wurde, verwende die Standardwerte
            pass

    # Daten für das Template bereitstellen
    context = {
        "participantName": participant_name,
        "participantGender_speech": participant_gender_speech,
        "participantGender_titel": participant_gender_titel,
        "participant_name_with_suffix": participant_name_with_suffix,
    }

    # Rendern der Vorlage
    return render(request, "webseite/webseite.html", context)


def update_answer(request):
    if request.method == "POST":
        try:
            # JSON-Daten aus der Anfrage lesen
            data = json.loads(request.body)
            mail_number = data.get("mailNumber")
            response_text = data.get("responseText", "")
            pdf_clicked = data.get("pdfClicked", 0)

            # Aktuelle Answer-Objekt abrufen
            answer_id = request.session.get("answer_id")
            answer = Answers.objects.get(id=answer_id)

            # Antwort basierend auf der mailNumber speichern
            if mail_number == 1:
                answer.answer1 = response_text
                answer.pdf_clicked = pdf_clicked
            elif mail_number == 2:
                answer.answer2 = response_text
            elif mail_number == 3:
                answer.answer3 = response_text
            elif mail_number == 4:
                answer.answer4 = response_text

            # Speichern des aktualisierten Answer-Objekts
            answer.save()

            return JsonResponse({"success": True})

        except Answers.DoesNotExist:
            return JsonResponse({"success": False, "error": "Answer not found"})

        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)})

    return JsonResponse({"success": False, "error": "Invalid request method"})


# Update install status
def update_install_status(request):
    if request.method == "POST":
        # Überprüfe, ob eine answer_id in der Session existiert
        if "answer_id" in request.session:
            try:
                # Hol das Answers-Objekt basierend auf der answer_id aus der Session
                answer = Answers.objects.get(id=request.session["answer_id"])
                # Aktualisiere den installed_update-Status
                answer.installed_update = 1
                answer.save()
                return JsonResponse(
                    {"success": True, "message": "Installationsstatus aktualisiert"}
                )
            except Answers.DoesNotExist:
                return JsonResponse(
                    {"success": False, "message": "Answers-Objekt nicht gefunden"}
                )
        else:
            return JsonResponse(
                {"success": False, "message": "Keine answer_id in der Session"}
            )
    else:
        return JsonResponse({"success": False, "message": "Ungültige Anfrage-Methode"})


# Abfrage Experimentnummer
def get_experiment_number(request):

    experiment_number = None
    # Überprüfe, ob eine answer_id in der Session existiert
    if "answer_id" in request.session:
        # Versuche, das passende Answers-Objekt abzurufen
        try:
            answer = Answers.objects.get(id=request.session["answer_id"])
            experiment_number = answer.experimentNumber
        except Answers.DoesNotExist:
            experiment_number = None

    # Gebe die Experimentnummer als JSON-Antwort zurück
    return JsonResponse({"experimentNumber": experiment_number})


@csrf_exempt
def update_participant_data(request):
    if request.method == "POST":
        try:
            # JSON-Daten vom Client abrufen
            data = json.loads(request.body)
            participant_name = data.get("participantName", "UnknownName")
            participant_gender = data.get("participantGender", "UnknownGender")

            # ID des Answers-Objekts aus der Session abrufen
            answer_id = request.session.get("answer_id")

            # Answers-Objekt aktualisieren
            if answer_id:
                answer = Answers.objects.get(id=answer_id)
                answer.participantName = participant_name
                answer.participantGender = participant_gender
                answer.save()

                # Erfolgsmeldung zurücksenden
                return JsonResponse({"success": True})
            else:
                return JsonResponse(
                    {"success": False, "error": "Answer ID nicht in Session gefunden."}
                )

        except Exception as e:
            # Fehler melden
            return JsonResponse({"success": False, "error": str(e)})

    return JsonResponse({"success": False, "error": "Invalid request method."})


# Antworten speichern
def save_response(request):
    if request.method == "POST":
        # Extrahiere Daten aus der Anfrage
        answer_id = request.session.get("answer_id")
        mail_number = request.POST.get("mailNumber")
        response_text = request.POST.get("responseText")
        pdf_clicked = int(request.POST.get("pdfClicked", 0))  # Konvertiere in Integer

        # Aktualisiere das Answers-Objekt
        try:
            answer = Answers.objects.get(id=answer_id)

            if mail_number == "1":
                answer.answer1 = response_text
                answer.pdf_clicked = pdf_clicked
            elif mail_number == "2":
                answer.answer2 = response_text
            elif mail_number == "3":
                answer.answer3 = response_text
            elif mail_number == "4":
                answer.answer4 = response_text

            # Speichere die Änderungen
            answer.save()

            return JsonResponse({"success": True})
        except Answers.DoesNotExist:
            return JsonResponse({"success": False, "error": "Answer not found"})

    return JsonResponse({"success": False, "error": "Invalid request method"})


def datenschutz(request):
    return render(request, "experiment/datenschutz.html")


def kontrolle(request):
    return render(request, "experiment/kontrolle.html")


def ISP(request):
    return render(request, "experiment/ISP.html")


def ISPkontrolle(request):
    return render(request, "experiment/ISPkontrolle.html")


def ZTest(request):
    return render(request, "webseite/ZTest.html")
