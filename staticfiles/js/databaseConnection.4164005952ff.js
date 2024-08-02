/////////// Datenbankanbindung ///////////

const totalMailNumbers = 3; // Anzahl der zu beantwortenden Mails
let answeredCount = 0;

// Funktion zum Abrufen des CSRF-Tokens
function getCsrfToken() {
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    if (tokenElement) {
        return tokenElement.getAttribute('content');
    } else {
        console.error("CSRF token not found");
        return "";
    }
}

// Funktion zur Datenbankaktualisierung
function addParticipantData(lastName, gender, experimentNumber) {
    let formData = new FormData();
    let token = getCsrfToken();

    formData.append('participantName', lastName);
    formData.append('participantGender', gender);
    formData.append('experimentNumber', experimentNumber);
    formData.append('csrfmiddlewaretoken', token);

    fetch('/webseite', {
        method: 'POST',
        body: formData
    }).then(response => {
        return response.json().then(data => {
            if (response.ok) {
                console.log('Daten erfolgreich gesendet:', data.message);
            } else {
                console.error('Fehler beim Senden der Daten:', data.message);
            }
        });
    }).catch(error => {
        console.error('Fehler:', error);
    });
}

// Antwort senden (Generische Funktion)
function sendAnswer(mailNumber) {
    let pop = document.getElementById(`Antwort_Email_${mailNumber}`);
    pop.classList.remove("open-popup");

    // "Antworten"-Button in der Mail ausgrauen und Text ändern
    const openAnswerBtn = document.getElementById(`openAnswerPopUp${mailNumber}`);
    openAnswerBtn.disabled = true;
    openAnswerBtn.textContent = "Nachricht gesendet";

    // Mail-Preview Farbe ausgrauen nach Antwort
    document.getElementById(`mail_Preview${mailNumber}`).style.color = '#a0a0a0';

    // Mausaktivitäten wiedergeben
    let mainElementBlock = document.getElementById('mainElement');
    mainElementBlock.classList.remove("answerOverlay");

    if (mailNumber === 10 || mailNumber === 20) {
        // Nur für mailNumber 10 oder 20 (X und Y -> Dummy Mails)
        return;
    }

    // Antwort aus Inputfeld in Datenbank speichern
    let responseText = document.getElementById(`responseText${mailNumber}`).value;
    let participantName = document.getElementById('participantNameSpan').textContent;
    let documentTile = document.getElementById('documentTile');
    let documentSelected = documentTile.classList.contains('selected') ? 1 : 0;

    let formData = new FormData();
    let token = getCsrfToken();

    formData.append(`answer${mailNumber}`, responseText);
    formData.append('participantName', participantName);
    formData.append('csrfmiddlewaretoken', token);
    formData.append('pdf_clicked', documentSelected);

    fetch('/webseite', {
        method: 'POST',
        body: formData
    }).then(response => {
        return response.json().then(data => {
            if (response.ok) {
                console.log('Antwort erfolgreich gesendet:', data.message);
                if (!(mailNumber === 2)) {
                    answeredCount++; // Zählen der gesendeten Antworten
                }
                if (answeredCount === totalMailNumbers) {
                    // Alle Antworten wurden gesendet
                    document.getElementById('completionSection').style.display = 'block';
                }
            } else {
                console.error('Fehler beim Senden der Antwort:', data.message);
            }
        });
    }).catch(error => {
        console.error('Fehler:', error);
    });
}

// function updateParticipantData(lastName, gender) {
//     let formData = new FormData();
//     let token = getCsrfToken();

//     formData.append('participantName', lastName);
//     formData.append('participantGender', gender);
//     formData.append('csrfmiddlewaretoken', token);

//     fetch('/login', {
//         method: 'POST',
//         body: formData
//     }).then(response => {
//         return response.json().then(data => {
//             if (response.ok) {
//                 console.log('Daten erfolgreich aktualisiert:', data.message);
//             } else {
//                 console.error('Fehler beim Aktualisieren der Daten:', data.message);
//             }
//         });
//     }).catch(error => {
//         console.error('Fehler:', error);
//     });
// }
