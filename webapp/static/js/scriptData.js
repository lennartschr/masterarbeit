// Array für Krankenkassen-Daten
let krankenkassen = [];
// Hilfe Timer
let timer;
let timer2;
// Funktionalitäten für Mailverteiler in der Handyversion
let navigationHistory = ["folderPage"];


// Funktionen für das Pop-up, um Nachname, Krankenkasse und Geschlecht einzugeben/auszuwählen
const addKrankenkasse = (ev) => {
    ev.preventDefault();

    // Überprüfen, ob alle Felder ausgefüllt wurden
    const inputFields = document.querySelectorAll('.formBox.input-container input, .formBox.input-container select');
    let allFieldsFilled = true;

    inputFields.forEach((input) => {
        if (!input.value) {
            allFieldsFilled = false;
            input.parentNode.classList.add('error');
        } else {
            input.parentNode.classList.remove('error');
        }
    });

    // Daten aus den Eingabefeldern abrufen und in das Array "krankenkassen" speichern
    let krankenkasse = {
        id: Date.now(),
        name: document.getElementById('title').value,
        lastName: document.getElementById('lastName').value,
        gender: document.getElementById('gender').value
    };
    krankenkassen.push(krankenkasse);
};

// Funktion zum Aktualisieren der Ansprache auf der Seite, die durch das Pop-up eingegeben wurde
function replaceAnsprache() {
    const gender = document.getElementById('gender').value;
    const anspracheSpans = document.querySelectorAll('span');

    anspracheSpans.forEach(span => {
        if (gender === 'männlich') {
            if (span.textContent === 'Ansprache') {
                span.textContent = "Sehr geehrter Herr";
            }
            if (span.textContent === 'AnspracheKurz') {
                span.textContent = "Herr";
            }
        } else if (gender === 'weiblich') {
            if (span.textContent === 'Ansprache') {
                span.textContent = "Sehr geehrte Frau";
            }
            if (span.textContent === 'AnspracheKurz') {
                span.textContent = "Frau";
            }
            if (span.textContent === 'langjähriger Kunde') {
                span.textContent = "langjährige Kundin";
            }
        } else if (gender === 'divers' || gender === 'andere') {
            if (span.textContent === 'Ansprache') {
                span.textContent = "Sehr geehrte*r Herr/Frau";
            }
            if (span.textContent === 'AnspracheKurz') {
                span.textContent = "Herr/Frau";
            }
            if (span.textContent === 'langjähriger Kunde') {
                span.textContent = "langjährige/r Kunde/Kundin";
            }
        }
    });
}

// Funktion zum Aktualisieren des Nachnamens auf der Seite, der durch das Pop-up eingegeben wurde
function replaceNachname() {
    const newName = document.getElementById('lastName').value;
    const nameSpans = document.querySelectorAll('span');

    nameSpans.forEach(span => {
        if (span.textContent === 'Nachname') {
            span.textContent = newName;
        }
    });
}

// Pop-up öffnen
function openPopup() {
    let pop = document.getElementById("popup1");
    pop.classList.add("open-popup");

    let blur = document.getElementById("blur");
    blur.classList.remove("deactive");
    blur.classList.toggle("active");
}

// Pop-up schließen
function closePopup() {
    // Überprüfen, ob alle Felder ausgefüllt wurden
    const inputFields = document.querySelectorAll('.formBox.input-container select');
    let allFieldsFilled = true;

    // Überprüfen, ob das Nachnamen-Feld ausgefüllt wurde
    const nachnameField = document.getElementById('lastName');
    const birthdateField = document.getElementById('birthdate');
    const genderField = document.getElementById('gender');

    if (!nachnameField.value) {
        alert('Bitte geben Sie einen Nachnamen ein.');
        nachnameField.parentNode.classList.add('error');
        return;
    }

    if (!birthdateField.value) {
        alert('Bitte geben Sie Ihr Geburtsdatum an.');
        birthdateField.parentNode.classList.add('error');
        return;
    }

    if (!genderField.value) {
        alert('Bitte wählen Sie Ihr Geschlecht.');
        genderField.parentNode.classList.add('error');
        return;
    }


    inputFields.forEach((input) => {
        if (!input.value) {
            allFieldsFilled = false;
            input.parentNode.classList.add('error');
        }
    });

    if (!allFieldsFilled) {
        alert('Bitte füllen Sie alle Felder aus.');
        return;
    }

    // Überprüfung des Wertes 'eigeneEingabe' im Dropdown-Menü
    const titleValue = document.getElementById('title').value;
    if (titleValue === 'eigeneEingabe') {
        alert('Bitte wählen Sie eine andere Option als "Andere Krankenkasse (Eigene Eingabe)".');
        document.getElementById('title').parentNode.classList.add('error');
        return;
    }

    // Ändern des Textes in der Navbar
    const companyName = document.getElementById('title').value;
    const navbarBrand = document.querySelector('.navbar-brand.js-scroll-trigger.navsize.a');
    navbarBrand.innerText = companyName;

    // Ändern des Textes in den Titeln
    const titleElements = document.querySelectorAll('#changeCompany');
    titleElements.forEach((element) => {
        element.innerText = companyName;
    });

    let pop = document.getElementById("popup1");
    pop.classList.remove("open-popup");

    let blur = document.getElementById("blur");
    blur.classList.toggle("deactive");
    blur.classList.remove("active");

    // Inhalt anzeigen lassen
    document.getElementById('mainContent').style.display = 'block';
    // Startet den Timer für Hilfe, sobald das Skript geladen wird
    initiateTimer();
    // Aktualisierte Texte einfügen
    replaceAnsprache();
    replaceNachname();
}

function initiateTimer() {
    // Setzt einen Timer, der 'openHelpPopup' nach 45 Sekunden auslöst
    // timer = setTimeout(openHelpPopup, 45000);
    timer = setTimeout(openHelpPopup, 8000);
}

function initiateTimer2() {
    // Setzt einen Timer, der 'openHelpPopup' nach 45 Sekunden auslöst
    // timer = setTimeout(openHelpPopup, 45000);
    timer2 = setTimeout(openHelpPopup2, 8000);
}

// Funktion zum Wechseln zur Sicherheitsinformation
function switchToSecurityInfo() {
    var mainInfo = document.getElementById("MainInfo");
    var welcomeMessage = document.getElementById("welcomeMessage");
    var securityInfo;

    if (window.innerWidth < 800) {
        // Bildschirmgröße < 800px: Mobile Sicherheitsinformation
        securityInfo = document.getElementById("SecurityInfoMobile");
    } else {
        // Bildschirmgröße >= 800px: PC Sicherheitsinformation
        securityInfo = document.getElementById("SecurityInfoPC");
    }

    if (mainInfo && securityInfo) {
        // MainInfo und WelcomeMessage ausblenden
        mainInfo.style.display = "none";
        welcomeMessage.style.display = "none";

        // SecurityInfo anzeigen
        securityInfo.style.display = "block";
    }

    // Auf Seitenanfang scrollen
    window.scrollTo(0, 0);
}

function changeMessageLogo() {
    var messageUnreadSymbol = document.getElementById('messageUnread');
    var messageReadSymbol = document.getElementById('messageRead');

    if (messageUnreadSymbol.style.display !== 'none') {
        messageUnreadSymbol.style.display = 'none';
        messageReadSymbol.style.display = 'block';
    } else {
        messageUnreadSymbol.style.display = 'block';
        messageReadSymbol.style.display = 'none';
    }

    // Startet den Timer für Hilfe, sobald das Skript geladen wird
    initiateTimer2();
}

// Pop-up ChooseExperiment
function chooseExperimentPopup() {
    let popupLogin = document.getElementById("ChooseExperiment");
    popupLogin.classList.add("open-popup");

    let blur = document.getElementById("blur");
    blur.classList.remove("deactive");
    blur.classList.toggle("active");
}

// Pop-up zum InformationPopup schließen
function closeChooseExperimentPopup() {
    let popupLogin = document.getElementById("ChooseExperiment");
    popupLogin.classList.remove("open-popup");

    if (Math.random() < 0.5) {
        window.location.href = '/A';
    } else {
        window.location.href = '/A';
    }
}

// Pop-up zum Login öffnen
function openLoginPopup() {
    clearTimeout(timer);  // Löscht den Timer, sodass 'openHelpPopup' nicht ausgeführt wird
    let popupLogin = document.getElementById("popupLogin");
    popupLogin.classList.add("open-popup");

    let blur = document.getElementById("blur");
    blur.classList.remove("deactive");
    blur.classList.toggle("active");

    // Eingabe des Nachnamens und des Namens abrufen
    let lastNameInput = document.getElementById("lastName").value;
    let name = document.getElementById('title').value;  // Hier holen wir den Wert von 'name'
    let usernameWithSuffix = lastNameInput + "@" + name + ".com";

    document.getElementById("username").value = usernameWithSuffix.toLowerCase();
    // Passwort automatisch ausfüllen
    document.getElementById("password").value = "UniGoettingenProjekt";
}

// Pop-up zum Login schließen
function closeLoginPopup() {
    // Überprüfen des eingegebenen Passworts
    const password = document.getElementById('password').value;

    if (password === 'UniGoettingenProjekt') {
        // Passwort und Nutzername korrekt
        let popupLogin = document.getElementById("popupLogin");
        popupLogin.classList.remove("open-popup");

        let blur = document.getElementById("blur");
        blur.classList.toggle("deactive");
        blur.classList.remove("active");

        // User-Message-Symbol anzeigen
        var logoPosition = document.getElementById("hide");
        logoPosition.style.display = "block";

        // Login-In Text entfernen und Symbol wechseln
        document.getElementById("login").style.display = "none";
        var loginAfter = document.getElementById("loginAfter");
        loginAfter.style.display = "flex";

        // Auf Seitenanfang scrollen
        window.scrollTo(0, 0);

        // Willkommensnachricht anzeigen
        var welcomeMessage = document.getElementById("welcomeMessage");
        welcomeMessage.style.display = "block";

        // notification-box anzeigen
        var notificationbox = document.getElementById("notification-box");
        notificationbox.style.display = "block";

    } else {
        // Falsches Passwort oder Nutzername
        alert('Das eingegebene Passwort oder der Nutzername ist falsch.');

        // Fehlerhafte Felder hervorheben
        if (username !== lastName) {
            document.getElementById("username").parentNode.classList.add('error');
        }
        if (password !== 'UniGoettingenProjekt') {
            document.getElementById("password").parentNode.classList.add('error');
        }
    }
}

function changeToInformation() {
    clearTimeout(timer2);
    let mailSecurityInfos = document.getElementById("SecurityInfos");
    mailSecurityInfos.style.display = "none";

    var informationMessage = document.getElementById("informationMessage");
    // Weitere Informationen anzeigen
    informationMessage.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    openInformationPopup();
}


// Pop-up zum InformationPopup öffnen
function openInformationPopup() {
    let popupLogin = document.getElementById("popupInformation");
    popupLogin.classList.add("open-popup");

    let blur = document.getElementById("blurInformation");
    blur.classList.remove("deactive");
    blur.classList.toggle("active");
}

// Pop-up zum InformationPopup schließen
function closeInformationPopup() {
    let popupLogin = document.getElementById("popupInformation");
    popupLogin.classList.remove("open-popup");

    let blur = document.getElementById("blurInformation");
    blur.classList.toggle("deactive");
    blur.classList.remove("active");
}

// Pop-up für Hilfe
function openHelpPopup() {
    let popupHelp = document.getElementById("popupHelp");
    popupHelp.classList.add("open-popup");

    let blur = document.getElementById("blurHelp");
    blur.classList.remove("deactive");
    blur.classList.toggle("active");
}

// Pop-up zum HilfePopup schließen
function closeHelpPopup() {
    let popupHelp = document.getElementById("popupHelp");
    popupHelp.classList.remove("open-popup");

    let blur = document.getElementById("blurHelp");
    blur.classList.toggle("deactive");
    blur.classList.remove("active");
}

// Pop-up für Hilfe
function openHelpPopup2() {
    let popupHelp = document.getElementById("popupHelp2");
    popupHelp.classList.add("open-popup");

    let blur = document.getElementById("blurHelp");
    blur.classList.remove("deactive");
    blur.classList.toggle("active");
}

// Pop-up zum HilfePopup schließen
function closeHelpPopup2() {
    let popupHelp = document.getElementById("popupHelp2");
    popupHelp.classList.remove("open-popup");

    let blur = document.getElementById("blurHelp");
    blur.classList.toggle("deactive");
    blur.classList.remove("active");
}

// Weiterleitung zur Umfrage mit Prototyp
function forwardToSurvey() {
    window.location.href = 'https://www.qualtrics.com/de/';
}

// Weiterleitung zur Umfrage ohne Prototyp
function forwardToSurveyOP() {
    window.location.href = 'https://www.qualtrics.com/de/';
}


// Event Listener hinzufügen
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn').addEventListener('click', addKrankenkasse);
    document.getElementById('btn').addEventListener('click', closePopup);

    document.getElementById('title').addEventListener('change', function () {
        const selectedOption = document.getElementById('title').value;
        if (selectedOption === 'eigeneEingabe') {
            const userInput = prompt('Bitte geben Sie den Namen der Krankenkasse ein:');
            if (userInput && userInput.length <= 20) { // Hier überprüfen wir die Länge der Eingabe
                document.getElementById('title').innerHTML += `<option value="${userInput}">${userInput}</option>`;
                document.getElementById('title').value = userInput;
            } else if (userInput && userInput.length > 20) { // Optionaler Abschnitt, um den Benutzer zu informieren
                alert('Bitte geben Sie nicht mehr als 20 Zeichen ein.');
            }
        }
    });

    // "Anmelden"
    document.getElementById('btnLogin').addEventListener('click', closeLoginPopup);
    // "Weiter zur Umfrage"
    document.getElementById("btnSurvey").addEventListener('click', changeToInformation);
    document.getElementById("btnSurvey2").addEventListener('click', changeToInformation);
    document.getElementById("btnCloseInfo").addEventListener('click', closeInformationPopup);
    document.getElementById("btnForward").addEventListener('click', forwardToSurvey);
});

// Funktion für den Blur-Effekt
function blurEffect() {
    let blur = document.getElementById("blur");

    // Füge die Klasse "active" hinzu und entferne die Klasse "deactive"
    blur.classList.remove("deactive");
    blur.classList.add("active");

    // User-Mail-Logo Klickbar entfernen
    var MailInDisable = document.getElementById("hide");
    MailInDisable.classList.add('disabled');

    // Nach 2 Sekunden entferne die Klasse "active" und füge "deactive" wieder hinzu
    setTimeout(function () {
        blur.classList.remove("active");
        blur.classList.add("deactive");
    }, 200);
}

function navigateTo(pageId) {
    document.getElementById(navigationHistory[navigationHistory.length - 1]).classList.remove('active');
    document.getElementById(pageId).classList.add('active');
    navigationHistory.push(pageId);
}

function navigateBack() {
    if (navigationHistory.length > 2) {
        document.getElementById(navigationHistory.pop()).classList.remove('active');
        document.getElementById(navigationHistory[navigationHistory.length - 1]).classList.add('active');
    }
}
