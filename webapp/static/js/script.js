/*//////////////// Fixe Variablen ////////////////*/
let navigationHistory = ["folderPage"]; // Funktionalitäten für Mailverteiler in der Handyversion

/*//////////////// Event-Listener ////////////////*/
document.addEventListener('DOMContentLoaded', () => {
    // "?" relevant, um zu prüfen ob Element existiert
    document.getElementById('btnDataPopUp')?.addEventListener('click', closeDataPopup);
    document.getElementById('btnWelcome')?.addEventListener('click', closeWelcome);

    // Mail Buttons:
    const mailNumbers = [1, 2, 3, 4, 5];
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

    document.getElementById('openSurvey')?.addEventListener('click', function () {
        window.open('https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_etws8ZxKhr2g77o', '_blank');
    });

    const documentTile = document.getElementById('documentTile');

    if (documentTile) {
        documentTile.addEventListener('click', function () {
            this.classList.toggle('selected');
        });
    }
});

//////////////// Start der Studie ////////////////
// Pop-up ChooseExperiment
function chooseExperimentPopup() {
    let popupLogin = document.getElementById("ChooseExperiment");
    popupLogin.classList.add("open-popup");

    let blur = document.getElementById("blur");
    blur.classList.remove("deactive");
    blur.classList.toggle("active");
}

// Pop-up ChooseExperiment schließen
function closeChooseExperimentPopup() {
    let popupLogin = document.getElementById("ChooseExperiment");
    popupLogin.classList.remove("open-popup");

    if (Math.random() < 0.5) {
        window.location.href = '/A';
    } else {
        window.location.href = '/A';
    }
}

//////////////// Webseite ////////////////

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
    }

    else {
        // Username und Passworteingabe
        let lastNameInput = nachnameField.value;
        let genderInput = genderField.value;

        // Sicherstellen, dass der erste Buchstabe groß geschrieben ist
        lastNameInput = lastNameInput.charAt(0).toUpperCase() + lastNameInput.slice(1).toLowerCase();
        // console.log("Teilnehmer: " + lastNameInput);

        // Close Popup
        let pop = document.getElementById("enterDataPopup");
        pop.classList.remove("open-popup");

        // Ladevorgang anzeigen
        document.getElementById('loaderOverlay1').style.display = 'flex';
        document.getElementById('spinner1').style.display = 'block';

        // Generiere eine Zufallszahl für das Experiment (1 bis 6)
        let experimentNumber = Math.floor(Math.random() * 6) + 1;
        // console.log("Experiment Number: " + experimentNumber);

        // Item erzeugen und Datenbank füllen
        addParticipantData(lastNameInput, genderInput, experimentNumber);

        // Homepage-Elemente anzeigen - Blur entfernen
        setTimeout(function () {
            // Spinner stoppen
            document.getElementById('loaderOverlay1').style.display = 'none';

            // Zur Homepage wechseln basierend auf der experimentNumber
            let experimentUrlMap = {
                1: '/webseite',
                2: '/webseite',
                3: '/webseite',
                4: '/webseite',
                5: '/webseite',
                6: '/webseite'

                // 1: '/webseiteAdler',
                // 2: '/webseiteIgel',
                // 3: '/webseiteHase',
                // 4: '/webseitePanda',
                // 5: '/webseiteFuchs',
                // 6: '/webseiteKoala'
            };
            window.location.href = experimentUrlMap[experimentNumber];

            // Timerlänge für "Konto erstellen"
        }, 200);
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
        document.getElementById('footerSettings').style.display = 'block';

        // Display Login-Area
        var loginArea = document.getElementById("LoginArea");
        loginArea.classList.remove("hideLoginArea");
        loginArea.classList.add("showLoginArea");

        // Background/Hintergrund entfernen
        document.body.style.backgroundImage = 'none';

        // Banner anzeigen
        var banner = document.getElementById("banner");
        banner.style.display = "block";

        // Willkommensnachricht anzeigen
        var welcomeMessage = document.getElementById("welcomeMessage");
        welcomeMessage.style.display = "block";

        // Auf Seitenanfang scrollen
        window.scrollTo(0, 0);

        // Usereingaben an Webseite anpassen
        // Funktion zum Aktualisieren der Anrede des Probanden auf der Webseite, der durch das Geschlecht eingegeben wurde
        // replaceAnrede();


        // Timer-Funktion - Zeitdruck starten
        // startTimer(89);

        // Timer für Anmeldung/Login
    }, 200);
}

function closeWelcomeMessage() {
    // Banner ausblenden
    var banner = document.getElementById("banner");
    banner.style.display = "none";

    // Willkommensnachricht ausblenden
    var welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.style.display = "none";
}

// Timer-Funktion - Zeitdruck
function startTimer(duration) {
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
            location.reload(); // Die Seite wird neu geladen, wenn der Timer Null erreicht.
            window.alert('Leider haben Sie die Anfragen nicht schnell genug beantworten können. Sie wurden daher ausgeloggt.');
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
    MailContainerMobile.style.display = "block";

    // Ausblenden Mailsymbol
    var mail = document.getElementById("messageUnread");
    mail.style.display = "none";

    // Ausblenden Footer
    document.getElementById('footerLinks').style.display = 'none';
    document.getElementById('footerSettings').style.backgroundColor = 'white';
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

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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

// Tooltip
function toggleTooltip() {
    var tooltip = document.getElementById('tooltip');
    if (tooltip.style.display === 'block') {
        tooltip.style.display = 'none';
    } else {
        tooltip.style.display = 'block';
    }
}

// Tooltip2
function toggleTooltip2() {
    var tooltip = document.getElementById('tooltip2');
    if (tooltip.style.display === 'block') {
        tooltip.style.display = 'none';
    } else {
        tooltip.style.display = 'block';
    }
}

// document.addEventListener('click', function (event) {
//     var tooltip = document.getElementById('tooltip');
//     var container = document.querySelector('.sender-email-container');
//     if (!container.contains(event.target) && tooltip.style.display === 'block') {
//         tooltip.style.display = 'none';
//     }
// });


/////////////////////////// Mail-Antworten ///////////////////////////

// Öffnen des Antwort Pop-ups (Generische Funktion)
function openAnswerPopUp(mailNumber) {
    let pop = document.getElementById(`Antwort_Email_${mailNumber}`);
    pop.classList.add("open-popup");

    // Mausaktivitäten blockieren
    let mainElementBlock = document.getElementById('mainElement');
    mainElementBlock.classList.add("answerOverlay");

    document.getElementById(`responseText${mailNumber}`).addEventListener('input', function () {
        var text = this.value.trim(); // Remove any leading or trailing whitespace
        var sendButton = document.getElementById(`sendAnswer${mailNumber}`);

        if (text.length > 5) {
            sendButton.disabled = false;
        } else {
            sendButton.disabled = true;
        }
    });

    const textarea = document.getElementById(`responseText${mailNumber}`);
    const charCount = document.getElementById(`charCount${mailNumber}`);

    textarea.addEventListener('input', () => {
        const remaining = textarea.maxLength - textarea.value.length;
        charCount.textContent = remaining;
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