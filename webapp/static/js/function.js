// importPackage(java.io);
// Script für das notwendige Ausfüllen der Daten

function redirect() {
    var a = 0;
    var b = 0;

    // Sobald eine Checkbox bestätigt wird, wird die Farbe der Bedingung visuell auf grün und die zur Frage gehörige Variable auf 1 gesetzt. Wird die Bestätigung zurückgenommen bleibt a weiterhin auf 1, da die Veränderung der Variable immer erst beim Klicken des Buttons ausgeführt/überprüft wird.
    if (document.getElementById("check1").checked == true) {
        a = 1;
        document.getElementById("required1").style.display = "none";
        document.getElementById("CC1").style.color = "rgb(28,110,200)";
    }

    if (document.getElementById("check2").checked == true) {
        b = 1;
        document.getElementById("required2").style.display = "none";
        document.getElementById("CC2").style.color = "rgb(28,110,200)";
    }
    // Überprüfen ob alle Checkboxen ausgefüllt wurden
    if ((a == 1) && (b == 1))
        window.location.href = '/website';
    else // Falls nicht alle Checkboxen ausgefüllt wurden wird die Funktion durchlaufen, die die Hinweise ausgibt
        showAdvice();
}

function redirectB() {
    var a = 0;
    var b = 0;

    // Sobald eine Checkbox bestätigt wird, wird die Farbe der Bedingung visuell auf grün und die zur Frage gehörige Variable auf 1 gesetzt. Wird die Bestätigung zurückgenommen bleibt a weiterhin auf 1, da die Veränderung der Variable immer erst beim Klicken des Buttons ausgeführt/überprüft wird.
    if (document.getElementById("check1").checked == true) {
        a = 1;
        document.getElementById("required1").style.display = "none";
        document.getElementById("CC1").style.color = "rgb(28,110,200)";
    }

    if (document.getElementById("check2").checked == true) {
        b = 1;
        document.getElementById("required2").style.display = "none";
        document.getElementById("CC2").style.color = "rgb(28,110,200)";
    }
    // Überprüfen ob alle Checkboxen ausgefüllt wurden
    if ((a == 1) && (b == 1))
        window.location.href = '/kontrolleB';
    else // Falls nicht alle Checkboxen ausgefüllt wurden wird die Funktion durchlaufen, die die Hinweise ausgibt
        showAdvice();
}

// Wird eine Checkbox nicht bestätigt wird beim nächsten Laden der Seite der Hinweistext eingeblendet und die Farbe der Bedingung wird auf schwarz gesetzt
function showAdvice() {
    if (document.getElementById("check1").checked == false) {
        document.getElementById("required1").style.display = "inline";
        document.getElementById("CC1").style.color = "black";
    }

    if (document.getElementById("check2").checked == false) {
        document.getElementById("required2").style.display = "inline";
        document.getElementById("CC2").style.color = "black";
    }
}

// Solange die Antworten falsch sind, kann der Nutzer nicht an dem Experiment teilnehmen und wird zurück zur Startseite geleitet
function redirect2() {
    var a = 0;
    var b = 0;
    var c = 0;

    if (document.getElementById("check1c").checked == true) {
        a = 1;
    }

    if (document.getElementById("check2a").checked == true) {
        b = 1;
    }

    if (document.getElementById("check3b").checked == true) {
        c = 1;
    }

    if ((a == 1) && (b == 1) && (c == 1)) {
        window.location.href = '/webseite';
    }

    // Pop-up-Fenster die den Hinweis ausgibt
    else {
        window.location.href = '/A';
        window.alert('Leider waren Ihre Angaben nicht korrekt.\nBitte lesen Sie die einzelnen Schritte des Experiments erneut.');
    }
}

// Solange die Antworten falsch sind, kann der Nutzer nicht an dem Experiment teilnehmen und wird zurück zur Startseite geleitet
function redirect2B() {
    var a = 0;
    var b = 0;
    var c = 0;

    if (document.getElementById("check1c").checked == true) {
        a = 1;
    }

    if (document.getElementById("check2a").checked == true) {
        b = 1;
    }

    if (document.getElementById("check3b").checked == true) {
        c = 1;
    }

    if ((a == 1) && (b == 1) && (c == 1)) {
        window.location.href = '/webseiteB';
    }

    // Pop-up-Fenster die den Hinweis ausgibt
    else {
        window.location.href = '/B';
        window.alert('Leider waren Ihre Angaben nicht korrekt.\nBitte lesen Sie die einzelnen Schritte des Experiments erneut.');
    }
}