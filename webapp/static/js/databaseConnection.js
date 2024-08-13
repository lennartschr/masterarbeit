// Globale Variable für die Experimentnummer
let experimentNumber;


///////////////////// Experiment Umgebung (Experiment/Kontrolle/ISP) /////////////////////

// Funktion, um die Experimentnummer über AJAX zu erhalten
async function fetchExperimentNumber() {
    try {
        const response = await fetch('/get_experiment_number/');
        const data = await response.json();
        return data.experimentNumber;
    } catch (error) {
        console.error('Fehler beim Abrufen der Experimentnummer:', error);
        return null;
    }
}

// Funktion, die beim Laden des Dokuments ausgeführt wird
document.addEventListener('DOMContentLoaded', async function () {
    // Experimentnummer abrufen und global speichern
    experimentNumber = await fetchExperimentNumber();

    console.log("Aktuelle Experimentnummer für ISP: " + experimentNumber);

    // Überprüfen, ob die Experimentnummer abgerufen wurde
    if (experimentNumber === null) {
        console.error("Experimentnummer konnte nicht abgerufen werden.");
        return;
    }

    // Elemente basierend auf der Experimentnummer anzeigen oder verbergen
    if (experimentNumber === 1 || experimentNumber === 2) {
        const cardLowers = document.querySelectorAll('.card-lower');
        cardLowers.forEach(cardLower => {
            cardLower.style.backgroundColor = '#fff';
            cardLower.style.display = 'none';
        });
        const controlQuestionDefault = document.getElementById('controlQuestionDefault');
        if (controlQuestionDefault) controlQuestionDefault.style.display = 'block';
    }
    // ExperimentNumber = 3 oder 4 --> Loss Aversion spezifische Elemente anzeigen
    else if (experimentNumber === 3 || experimentNumber === 4) {
        document.querySelectorAll('#nudgeLossAversion_1, #nudgeLossAversion_2, #nudgeLossAversion_3, #nudgeLossAversion_4').forEach(element => {
            element.style.display = 'block';
        });
        // Loss Aversion Kontrollfrage anzeigen
        const controlQuestionLossAversion = document.getElementById('controlQuestionLossAversion');
        if (controlQuestionLossAversion) controlQuestionLossAversion.style.display = 'block';
    }
    // ExperimentNumber = 5 oder 6 --> Social Proof spezifische Elemente anzeigen
    else if (experimentNumber === 5 || experimentNumber === 6) {
        document.querySelectorAll('#nudgeSocialProof_1, #nudgeSocialProof_2, #nudgeSocialProof_3, #nudgeSocialProof_4').forEach(element => {
            element.style.display = 'block';
        });
        // Social Proof Kontrollfrage anzeigen
        const controlQuestionSocialProof = document.getElementById('controlQuestionSocialProof');
        if (controlQuestionSocialProof) controlQuestionSocialProof.style.display = 'block';
    }

    // Kartengröße anpassen
    fitCards();
});

// Funktion, um die Kartengröße anzupassen
function fitCards() {
    const cardLowers = document.querySelectorAll('.card-lower');
    let maxHeight = 0;

    cardLowers.forEach(cardLower => {
        const height = cardLower.offsetHeight;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });

    cardLowers.forEach(cardLower => {
        cardLower.style.height = `${maxHeight}px`;
    });

    const cardTitles = document.querySelectorAll('.card-title');
    let maxHeightTitle = 0;

    cardTitles.forEach(cardTitle => {
        const height = cardTitle.offsetHeight;
        if (height > maxHeightTitle) {
            maxHeightTitle = height;
        }
    });

    cardTitles.forEach(cardTitle => {
        cardTitle.style.height = `${maxHeightTitle}px`;
    });
}

// Solange die Antworten falsch sind, kann der Nutzer nicht an dem Experiment teilnehmen und wird zurück zu den Richtlinien geleitet
async function redirect3() {
    const isCheck1Correct = document.getElementById('check1a_ISP').checked;

    let isCheck2Correct = false;
    let isAnswerCorrect = false;

    // Experimentnummern überprüfen
    if (experimentNumber === 1 || experimentNumber === 2) {
        isCheck2Correct = document.getElementById('check2b_DefaultISP').checked;
        isAnswerCorrect = isCheck1Correct && isCheck2Correct;
    } else if (experimentNumber === 3 || experimentNumber === 4) {
        isCheck2Correct = document.getElementById('check2a_LossAversionISP').checked;
        isAnswerCorrect = isCheck1Correct && isCheck2Correct;
    } else if (experimentNumber === 5 || experimentNumber === 6) {
        isCheck2Correct = document.getElementById('check2a_SocialProofISP').checked;
        isAnswerCorrect = isCheck1Correct && isCheck2Correct;
    }

    // Entscheidung über die Weiterleitung
    if (isAnswerCorrect) {
        window.location.href = '/login';
    } else {
        window.alert('Leider waren Ihre Angaben nicht korrekt.\nBitte lesen Sie die Richtlinien erneut.');
        window.location.href = '/ISP';
    }
}




///////////////////// Webseite Umgebung (Login/Webseite) /////////////////////

// Login Update
function updateParticipantData(lastNameInput, genderInput) {
    fetch('/update_participant_data/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({
            participantName: lastNameInput,
            participantGender: genderInput
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Daten erfolgreich aktualisiert.');
            } else {
                console.error('Fehler beim Aktualisieren der Daten:', data.error);
            }
        })
        .catch(error => {
            console.error('Fehler beim Senden der Anfrage:', error);
        });
}

// Funktion zum Abrufen des CSRF-Tokens aus dem Cookie
function getCSRFToken() {
    const csrfTokenValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];

    return csrfTokenValue || '';
}












/////////// Datenbankanbindung Email ///////////

// Objekt zur Verfolgung des Sendestatus der Antworten
let sentAnswers = 0;

// Antwort senden (Generische Funktion)
async function sendAnswer(mailNumber) {
    let pop = document.getElementById(`Antwort_Email_${mailNumber}`);
    pop.classList.remove("open-popup");

    // "Antworten"-Button in der Mail ausgrauen und Text ändern
    const openAnswerBtn = document.getElementById(`openAnswerPopUp${mailNumber}`);
    openAnswerBtn.disabled = true;
    openAnswerBtn.textContent = "Nachricht gesendet";

    // Mail-Preview Farbe ausgrauen nach Antwort
    document.getElementById(`mail_Preview${mailNumber}`).style.color = '#a0a0a0';

    // Löschfunktion ausblenden
    document.getElementById(`more_Options${mailNumber}`).style.display = 'none';

    // Mausaktivitäten wiedergeben
    let mainElementBlock = document.getElementById('mainElement');
    mainElementBlock.classList.remove("answerOverlay");

    if (mailNumber === 10 || mailNumber === 20) {
        // Nur für mailNumber 10 oder 20 (X und Y -> Dummy Mails)
        return;
    }

    // Antwort aus Inputfeld in Datenbank speichern
    let responseText = document.getElementById(`responseText${mailNumber}`).value;

    // Bei Mailnumber=1 prüfen, ob das PDF geklickt wurde
    let pdfClicked = 0;
    if (mailNumber === 1) {
        let documentTile = document.getElementById('documentTile');
        pdfClicked = documentTile.classList.contains('selected') ? 1 : 0;
    }

    // Daten an den Server senden
    try {
        const response = await fetch('/update_answer/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken() // Funktion, um das CSRF-Token zu erhalten
            },
            body: JSON.stringify({
                mailNumber: mailNumber,
                responseText: responseText,
                pdfClicked: pdfClicked
            })
        });

        const data = await response.json();
        if (data.success) {
            console.log('Antwort erfolgreich gespeichert');
            if (mailNumber !== 2) {
                sentAnswers++; // Zählen der gesendeten erforderlichen Antworten
            }

            if (sentAnswers === 3) {
                // Alle Antworten wurden gesendet
                document.getElementById('completionSection').style.display = 'block';
            }
        } else {
            console.error('Fehler beim Speichern der Antwort:', data.error);
        }
    } catch (error) {
        console.error('Fehler bei der Anfrage:', error);
    }
}


// Antwort gelöscht (Generische Funktion)
async function sendAnswerDelete(mailNumber) {

    if (mailNumber === 10 || mailNumber === 20) {
        // Nur für mailNumber 10 oder 20 (X und Y -> Dummy Mails)
        return;
    }

    // Antwort "Gelöscht" in der Datenbank speichern
    let responseText = "* Gelöscht *";

    // Bei Mailnumber=1 prüfen, ob das PDF geklickt wurde
    let pdfClicked = 0;
    if (mailNumber === 1) {
        let documentTile = document.getElementById('documentTile');
        pdfClicked = documentTile.classList.contains('selected') ? 1 : 0;
    }

    // Daten an den Server senden
    try {
        const response = await fetch('/update_answer/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken() // Funktion, um das CSRF-Token zu erhalten
            },
            body: JSON.stringify({
                mailNumber: mailNumber,
                responseText: responseText,
                pdfClicked: pdfClicked
            })
        });

        const data = await response.json();
        if (data.success) {
            console.log('Löschung erfolgreich gespeichert');
            if (mailNumber !== 2) {
                sentAnswers++; // Zählen der gesendeten erforderlichen Antworten
                console.log('Send Answer Anzahl: ' + sentAnswers);
            }

            if (sentAnswers === 3) {
                // Alle Antworten wurden gesendet
                document.getElementById('completionSection').style.display = 'block';
            }
        } else {
            console.error('Fehler beim Speichern der Löschung:', data.error);
        }
    } catch (error) {
        console.error('Fehler bei der Anfrage:', error);
    }
}


// Funktion, um das CSRF-Token aus dem Cookie zu erhalten
function getCSRFToken() {
    const csrfCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
    if (csrfCookie) {
        return csrfCookie.split('=')[1];
    }
    return '';
}


async function updateInstallStatus() {
    try {
        const response = await fetch('/update_install_status/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Stelle sicher, dass du den CSRF-Token mitsendest
            },
            body: JSON.stringify({ installed_update: 1 }) // Sende ggf. zusätzliche Daten
        });

        const data = await response.json();

        if (data.success) {
            console.log('Installationsstatus erfolgreich aktualisiert.');
        } else {
            console.error('Fehler beim Aktualisieren des Installationsstatus:', data.message);
        }
    } catch (error) {
        console.error('Netzwerkfehler:', error);
    }
}

// Hilfsfunktion, um den CSRF-Token zu holen
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Finde das Cookie, das den Namen hat
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
