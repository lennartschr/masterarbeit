/*//////////////// Fixe Variablen ////////////////*/
let navigationHistory = ["folderPage"]; // Funktionalitäten für Mailverteiler in der Handyversion

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



///////////////////// Experiment Umgebung (Login/Webseite) /////////////////////
/*//////////////// Event-Listener ////////////////*/
document.addEventListener('DOMContentLoaded', () => {

    // "?" relevant, um zu prüfen ob Element existiert
    const btnDataPopUp = document.getElementById('btnDataPopUp');
    if (btnDataPopUp) {
        btnDataPopUp.addEventListener('click', closeDataPopup);
    }

    const btnWelcome = document.getElementById('btnWelcome');
    if (btnWelcome) {
        btnWelcome.addEventListener('click', closeWelcome);
    }

    // Mail Buttons:
    const mailNumbers = [1, 2, 3, 4, 10, 20];
    mailNumbers.forEach(number => {
        const openBtn = document.getElementById(`openAnswerPopUp${number}`);
        const closeBtn = document.getElementById(`sendAnswer${number}`);

        if (openBtn) {
            openBtn.addEventListener('click', function () { openAnswerPopUp(number); });
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', function () { sendAnswer(number); });
        }
    });

    // PDF-Einstellungen
    const documentTile = document.getElementById('documentTile');
    if (documentTile) {
        documentTile.addEventListener('click', function () {
            this.classList.toggle('selected');
            updateSendButtonState(1);
        });
    }

    // Hinzufügen der Event-Listener für openSurvey-Button
    const openSurvey = document.getElementById('openSurvey');
    if (openSurvey) {
        openSurvey.addEventListener('click', function () {
            let url;

            switch (experimentNumber) {

                // 1.	Standard Policy	+ 	Ohne Stress
                case 1:
                    url = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_6yQGq8lz47KbKPI';
                    break;

                // 2.	Standard Policy	+ 	Mit Stress
                case 2:
                    url = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_6yxJgDlsDvuyy90';
                    break;

                // 3.	Standard Policy	+ 	Ohne Stress	+ 	Nudge (Loss_Aversion)
                case 3:
                    url = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_e3T0Tla24tIqawK';
                    break;

                // 4.	Standard Policy	+ 	Mit Stress		+ 	Nudge (Loss_Aversion)
                case 4:
                    url = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_e9u7XuCIz7Y9DqC';
                    break;

                // 5.	Standard Policy	+ 	Ohne Stress	+ 	Nudge (Social_Proof)
                case 5:
                    url = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_ePvkN7WNWl3IPH0';
                    break;

                // 6.	Standard Policy	+ 	Mit Stress		+ 	Nudge (Social_Proof)
                case 6:
                    url = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_3Pq5OBh2ykHh058';
                    break;

                default:
                    url = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_etws8ZxKhr2g77o';
                    break;
            }
            window.open(url, '_blank');
        });
    }
});





//////////////// Login ////////////////

// Pop-up User-Daten öffnen
function openDataPopup() {
    let pop = document.getElementById("enterDataPopup");
    pop.classList.add("open-popup");
}

// Pop-up User-Daten schließen und Daten an Login übergeben
function closeDataPopup() {
    // Überprüfen, ob alle Felder ausgefüllt wurden
    const inputFields = document.querySelectorAll('.formBox.input-container select');
    let allFieldsFilled = true;

    // Überprüfen, ob das Nachnamen-Feld ausgefüllt wurde
    const nachnameField = document.getElementById('lastName');
    const genderField = document.getElementById('gender');

    inputFields.forEach((input) => {
        if (!input.value) {
            allFieldsFilled = false;
            input.parentNode.classList.add('error');
        }
    });

    if (!nachnameField.value && !genderField.value) {
        alert('Bitte füllen Sie alle Felder aus.');
        return;
    }

    if (!nachnameField.value) {
        alert('Bitte geben Sie Ihren Nachnamen ein.');
        nachnameField.parentNode.classList.add('error');
        return;
    }

    if (!genderField.value) {
        alert('Bitte wählen Sie Ihr Geschlecht.');
        genderField.parentNode.classList.add('error');
        return;
    } else {
        // Username und Passworteingabe
        let lastNameInput = nachnameField.value;
        let genderInput = genderField.value;

        // Sicherstellen, dass der erste Buchstabe groß geschrieben ist
        lastNameInput = lastNameInput.charAt(0).toUpperCase() + lastNameInput.slice(1).toLowerCase();

        // Close Popup
        let pop = document.getElementById("enterDataPopup");
        pop.classList.remove("open-popup");

        // Ladevorgang anzeigen
        document.getElementById('loaderOverlay1').style.display = 'flex';
        document.getElementById('spinner1').style.display = 'block';

        // Item erzeugen und Datenbank füllen
        updateParticipantData(lastNameInput, genderInput);

        // Homepage-Elemente anzeigen - Blur entfernen
        setTimeout(function () {
            // Spinner stoppen
            document.getElementById('loaderOverlay1').style.display = 'none';

            // Zur Homepage wechseln
            window.location.href = '/webseite';
        }, 2000);
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Homepage-Elemente und PopUpLogin anzeigen
function openLoginPopup() {
    var welcomePage = document.getElementById("welcomePage");
    welcomePage.classList.remove("hide");

    // Navbar Farbe ändern
    var navbar = document.getElementById("containernav");
    navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';

    // Entferne Ladevorgang
    mainElement.classList.remove("mainBlur");

    // Passwort automatisch ausfüllen
    document.getElementById('password').value = "UniGoettingenProjekt";
}

function closeWelcome() {
    // Ladevorgang anzeigen
    document.getElementById('loaderOverlay2').style.display = 'flex';
    document.getElementById('spinner2').style.display = 'block';

    // Homepage-Elemente anzeigen - Blur entfernen
    setTimeout(function () {
        // Close Welcome
        var welcomePage = document.getElementById("welcomePage");
        welcomePage.style.display = "none";

        // Navbar und Footer ausblenden lassen
        document.getElementById('containernav').style.display = 'none';

        // Entferne Ladevorgang
        document.getElementById('loaderOverlay2').style.display = 'none';
        mainElement.classList.remove("mainBlur");

        // Navbar und Footer anzeigen lassen
        document.getElementById('containernav').style.display = 'flex';
        document.getElementById('footerColor').style.display = 'block';

        // Display Login-Area
        var loginArea = document.getElementById("LoginArea");
        loginArea.classList.remove("hideLoginArea");
        loginArea.classList.add("showLoginArea");

        // Background/Hintergrund entfernen
        document.body.style.backgroundImage = 'none';

        // Background/Hintergrund entfernen
        document.body.style.backgroundColor = '#194E51';

        // DemandTask Pop up anzeigen basierend auf der Experimentnummer
        if (experimentNumber === 2 || experimentNumber === 4 || experimentNumber === 6) {
            openTaskDemandPopUp();
        } else {
            // Banner anzeigen
            var banner = document.getElementById("banner");
            banner.style.display = "block";

            // Willkommensnachricht anzeigen
            var welcomeMessage = document.getElementById("welcomeMessage");
            welcomeMessage.style.display = "block";
        }

        // Auf Seitenanfang scrollen
        window.scrollTo(0, 0);

        // Timer für Anmeldung/Login
    }, 2000);
}


// Öffnen des Pop-ups für Task-Demand
function openTaskDemandPopUp() {

    let pop = document.getElementById('taskDemand');
    pop.classList.add("open-popup");

    // Mausaktivitäten blockieren
    let mainElementBlock = document.getElementById('mainElement');
    mainElementBlock.classList.add("overlay");
}


// Schließt das Pop-ups für Task-Demand
function closeTaskDemandPopUp() {
    // Timer-Funktion - Zeitdruck starten

    if (experimentNumber === 2 || experimentNumber === 4 || experimentNumber === 6) {
        // Pro Mail: 100 Sekunden a 6 Mails = 600 Sekunden = 10 Minuten
        startTimer(599, experimentNumber);
    }

    let pop = document.getElementById('taskDemand');
    pop.classList.remove("open-popup");

    // Mausaktivitäten wiedergeben
    let mainElementBlock = document.getElementById('mainElement');
    mainElementBlock.classList.remove("overlay");

    // Banner anzeigen
    var banner = document.getElementById("banner");
    banner.style.display = "block";

    // Willkommensnachricht anzeigen
    var welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.style.display = "block";
}


function handleMailboxNavigation() {
    navigateTo('inboxPage');
    showMailbox();
    closeWelcomeMessage();
}

function closeWelcomeMessage() {
    // Body Farbe ändern
    document.body.style.backgroundColor = '#fff';

    // Banner ausblenden
    var banner = document.getElementById("banner");
    banner.style.display = "none";

    // Willkommensnachricht ausblenden
    var welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.style.display = "none";
}

// Timer-Funktion - Zeitdruck
function startTimer(duration, experimentNumber) {
    // Timer starten
    let timer = duration, minutes, seconds;
    const display = document.getElementById('timer');

    const interval = setInterval(() => {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        // Wechselt die Farbe zu rot, wenn noch 1 Minute oder weniger verbleibt
        if (timer <= 60) {
            display.style.color = 'red';
            display.style.fontWeight = 'bold';
        }

        if (--timer < 0) {
            clearInterval(interval);
            let url;

            switch (experimentNumber) {

                // 1.	Standard Policy	+ 	Ohne Stress
                case 1:
                    url = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_6yQGq8lz47KbKPI';
                    break;

                // 2.	Standard Policy	+ 	Mit Stress
                case 2:
                    url = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_6yxJgDlsDvuyy90';
                    break;

                // 3.	Standard Policy	+ 	Ohne Stress	+ 	Nudge (Loss_Aversion)
                case 3:
                    url = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_e3T0Tla24tIqawK';
                    break;

                // 4.	Standard Policy	+ 	Mit Stress		+ 	Nudge (Loss_Aversion)
                case 4:
                    url = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_e9u7XuCIz7Y9DqC';
                    break;

                // 5.	Standard Policy	+ 	Ohne Stress	+ 	Nudge (Social_Proof)
                case 5:
                    url = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_ePvkN7WNWl3IPH0';
                    break;

                // 6.	Standard Policy	+ 	Mit Stress		+ 	Nudge (Social_Proof)
                case 6:
                    url = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_3Pq5OBh2ykHh058';
                    break;

                default:
                    url = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_etws8ZxKhr2g77o';
                    break;
            }

            window.location.href = url; // Leitet den Benutzer zu der ausgewählten URL weiter
            window.alert('Leider haben Sie die E-Mails nicht in der vorgegebenen Zeit beantworten können. Sie wurden daher ausgeloggt.');
        }
    }, 1000);

    // Timer anzeigen
    document.getElementById('timerContainer').style.display = 'block';
}

//////////////////// Mailsystem ////////////////////

// Mailbox Starten
function showMailbox() {
    // Display MailContainer
    var MailContainerMobile = document.getElementById("MailContainerMobile");
    // Überprüfen, ob die Bildschirmbreite kleiner als 800 Pixel ist
    if (window.innerWidth < 800) {
        MailContainerMobile.style.display = "block";
    } else {
        MailContainerMobile.style.display = "flex";
    }

    // Ausblenden Mailsymbol
    var mail = document.getElementById("messageUnread");
    mail.style.display = "none";

    // Ausblenden Footer
    document.getElementById('footerColor').style.display = 'block';
    document.getElementById('footerColor').style.backgroundColor = 'white';
}

// Navigation anzeigen
function showNavigation() {
    var navigation = document.getElementById("navigationSymbol");
    navigation.style.display = "block";
}

// Navigation ausblenden
function hideNavigation() {
    var navigation = document.getElementById("navigationSymbol");
    navigation.style.display = "none";
}

function navigateTo(pageId) {
    document.getElementById(navigationHistory[navigationHistory.length - 1]).classList.remove('active');
    document.getElementById(pageId).classList.add('active');
    navigationHistory.push(pageId);
}

function changeColor() {
    // Mail-Preview Farbe von Phishing Mail ausgrauen nachdem man die Mail angesehen hat, um Verwirrung zu vermeiden
    document.getElementById('mail_Preview2').style.color = '#a0a0a0';
}

function navigateBack() {
    if (navigationHistory.length > 2) {
        document.getElementById(navigationHistory.pop()).classList.remove('active');
        document.getElementById(navigationHistory[navigationHistory.length - 1]).classList.add('active');
        // console.log(navigationHistory)
    }
    if (navigationHistory.length == 2) {
        hideNavigation();
    }
}

// Entfernt die blauen Dots bei ungelesenen Mails und reduziert die Zahl in der Inbox
function removeDot(dotNumber) {
    var blueDot = document.getElementById("blueDot" + dotNumber);
    if (blueDot && blueDot.style.backgroundColor !== 'transparent') {
        blueDot.style.backgroundColor = 'transparent';

        // Reduziere die Zahl im inboxNumber span um eins
        var inboxNumber = document.getElementById("inboxNumber");
        var currentNumber = parseInt(inboxNumber.textContent, 10); // Konvertiere den Text zu einer Zahl
        if (currentNumber > 0) {
            var newNumber = currentNumber - 1;
            inboxNumber.textContent = newNumber; // Aktualisiere die Zahl

            // Blende die Zahl aus, wenn sie 0 erreicht
            if (newNumber === 0) {
                inboxNumber.style.display = 'none';
            }
        }
    }
}

/////////////////////////// Mail-Antworten ///////////////////////////

// Öffnen des Antwort Pop-ups (Generische Funktion)
function openAnswerPopUp(mailNumber) {
    let pop = document.getElementById(`Antwort_Email_${mailNumber}`);
    pop.classList.add("open-popup");

    // Mausaktivitäten blockieren
    let mainElementBlock = document.getElementById('mainElement');
    mainElementBlock.classList.add("answerOverlay");

    const textarea = document.getElementById(`responseText${mailNumber}`);
    const charCount = document.getElementById(`charCount${mailNumber}`);

    textarea.addEventListener('input', () => {
        const remaining = textarea.maxLength - textarea.value.length;
        charCount.textContent = remaining;
        updateSendButtonState(mailNumber);
    });
}

// Schließen des Antwort Pop-ups über "X-Button" (Generische Funktion)
function closeAnswerPopUp(mailNumber) {
    let pop = document.getElementById(`Antwort_Email_${mailNumber}`);
    pop.classList.remove("open-popup");

    // Mausaktivitäten wiedergeben
    let mainElementBlock = document.getElementById('mainElement');
    mainElementBlock.classList.remove("answerOverlay");
}

function updateSendButtonState(mailNumber) {
    const textarea = document.getElementById(`responseText${mailNumber}`);
    const documentTile = document.getElementById('documentTile');
    const sendButton = document.getElementById(`sendAnswer${mailNumber}`);

    const textValid = textarea.value.trim().length > 5;
    const pdfSelected = documentTile.classList.contains('selected');

    if (mailNumber === 1) {
        // Für Mailnummer 1: Button aktivieren, wenn entweder Text gültig ist oder PDF ausgewählt ist
        if (textValid || pdfSelected) {
            sendButton.disabled = false;
        } else {
            sendButton.disabled = true;
        }
    } else {
        // Für alle anderen Mailnummern: Button aktivieren, wenn Text gültig ist
        if (textValid) {
            sendButton.disabled = false;
        } else {
            sendButton.disabled = true;
        }
    }
}

// Funktion zum Anzeigen des Update-Pop-ups
function openUpdatePopUp() {
    // Pop-up Text und Spinner initialisieren
    let updateStatus = document.getElementById('updateStatus');
    let loadingSpinner = document.getElementById('loadingSpinner');
    let successIcon = document.getElementById('successIcon');
    let closeUpdateBtn = document.getElementById('closeUpdateBtn');

    updateStatus.textContent = 'Update startet ...';
    loadingSpinner.classList.remove('hidden');
    successIcon.classList.add('hidden');
    closeUpdateBtn.classList.add('hidden');

    // Pop-up öffnen
    let pop = document.getElementById('updatePopup');
    pop.classList.add("open-popup");

    // Mausaktivitäten blockieren
    let mainElementBlock = document.getElementById('mainElement');
    mainElementBlock.classList.add("answerOverlay");

    // Link deaktivieren
    let updateLink = document.getElementById('updateLink');
    updateLink.classList.add('disabled-link');
    updateLink.onclick = null; // Entfernen Sie das onclick-Ereignis

    // Mail-Preview Farbe ausgrauen nach Update
    document.getElementById('mail_Preview2').style.color = '#a0a0a0';

    // Timer für den Update und die Installation
    setTimeout(() => {
        updateStatus.textContent = 'Installation erfolgreich';
        loadingSpinner.classList.add('hidden');
        successIcon.classList.remove('hidden');
        closeUpdateBtn.classList.remove('hidden');

        // Senden einer Anfrage, um den Installationsstatus zu aktualisieren
        updateInstallStatus();
    }, 2000);
}

// Funktion zum Aktualisieren des Installationsstatus
function updateInstallStatus() {
    let formData = new FormData();
    let token = getCsrfToken();
    let participantName = document.getElementById('participantNameSpan').textContent;

    formData.append('participantName', participantName);
    formData.append('csrfmiddlewaretoken', token);

    fetch('/update_install_status', {
        method: 'POST',
        body: formData
    }).then(response => {
        return response.json().then(data => {
            if (response.ok) {
                console.log('Installationsstatus erfolgreich aktualisiert:', data.message);
            } else {
                console.error('Fehler beim Aktualisieren des Installationsstatus:', data.message);
            }
        });
    }).catch(error => {
        console.error('Fehler:', error);
    });
}

// Funktion zum Schließen des Update-Pop-ups
function closeUpdatePopUp() {
    let pop = document.getElementById('updatePopup');
    pop.classList.remove("open-popup");

    // Mausaktivitäten wieder ermöglichen
    let mainElementBlock = document.getElementById('mainElement');
    mainElementBlock.classList.remove("answerOverlay");
}