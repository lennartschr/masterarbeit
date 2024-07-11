importPackage(java.io);
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
        window.location.href = '/kontrolle';
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
        redirectWebsite();
    }

    // Pop-up-Fenster die den Hinweis ausgibt
    else {
        window.location.href = '/';
        window.alert('Leider waren Ihre Angaben nicht korrekt.\nBitte lesen Sie die einzelnen Schritte des Experiments erneut.');
    }
}

// randomisierte Weiterleitung zu den unterschiedlichen Websiten
function redirectWebsite() {
    var a = Math.floor(Math.random() * 2 + 1);

    // Website mit hoher Transparenz
    if (a == 1) {
        window.location.href = '/eingabedaten';
    }

    // Website mit geringer Transparenz
    if (a == 2) {
        window.location.href = '/eingabedaten';
    }
}

// Weiterleitung zur Umfrage mit Transparenz
function forwardSurvey() {
    window.location.href = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_1NbxOKTcRqAIh0i';
}

// Weiterleitung zur Umfrage ohne Transparenz
function forwardSurveyNT() {
    window.location.href = 'https://wiwigoettingen.eu.qualtrics.com/jfe/form/SV_eKyvYu5FlDfjO98';
}

// Pop-up öffnen
function openPopup() {
    let pop = document.getElementById("popup1");
    pop.classList.add("open-popup");

    let blur = document.getElementById("blur");
    blur.classList.remove("deactive");
    blur.classList.toggle("active");
}

// Pop-up und Status-Updates starten
function update() {
    var week = 0;

    // Pop-Up entfernen
    let pop = document.getElementById("popup1");
    pop.classList.remove("open-popup");

    let blur = document.getElementById("blur");
    blur.classList.toggle("deactive");
    blur.classList.remove("active");

    // Tabelle wählen
    var table = document.getElementById("statusupdates");

    // Überprüfen was sich in der letzten Row befindet
    var rows = document.getElementsByTagName("table")[0].rows;
    var last = rows[rows.length - 1];
    var cell = last.cells[2];
    var value = cell.innerHTML


    if (value == "08. November 2022") {
        // Eine neue Row erstellen
        var row = table.insertRow(2);

        // Neue Zellen zu Row hinzufügen
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        // Text hinzufügen
        cell1.innerHTML = "#Zx4";
        cell2.innerHTML = "Beginn der Untersuchungen des Vorgangs und der Identifizierung der Sicherheitslücke. Unser Unternehmen arbeitet hierbei mit externen Experten zusammen.";
        cell3.innerHTML = "10. November 2022";

        // Update des Zuletzt aktualisiert Datums
        setTimeout(function () {
            updateDate1();
        }, 500);

        // Update des Zuletzt aktualisiert Datums
        setTimeout(function () {
            updateDate11();
        }, 1400);

        // Text Pop-Up ändern
        var date = document.getElementById("popup-text-change").textContent = "Eine Woche nach Bekanntgabe der Datenschutzverletzung ist vergangen. Sie besuchen die Website erneut, um sich über neue Sicherheits-Updates im Hinblick auf die Datenschutzverletzung zu informieren.";

        // Button text change
        var buttonforward = document.getElementById("buttonmessage").textContent = "Nächster Schritt";
    }

    if (value == "10. November 2022") {
        // Eine neue Row erstellen
        var row = table.insertRow(3);

        // Neue Zellen zu Row hinzufügen
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        // Text hinzufügen
        cell1.innerHTML = "#Zx4";
        cell2.innerHTML = "Seit dem 09. November 2022 wurden keine Aktivitäten der Angreifer mehr im System festgestellt. Aktuell führen wir die Schließung der Sicherheitslücke durch.";
        cell3.innerHTML = "18. November 2022";

        // Update des Zuletzt aktualisiert Datums
        setTimeout(function () {
            updateDate2();
        }, 500);

        // Update des Zuletzt aktualisiert Datums
        setTimeout(function () {
            updateDate22();
        }, 1400);

        // Text Pop-Up ändern
        var date = document.getElementById("popup-text-change").textContent = "Inzwischen ist ein Monat nach Bekanntgabe der Datenschutzverletzung vergangen. Sie besuchen die Website erneut, um sich über neue Sicherheits-Updates im Hinblick auf die Datenschutzverletzung zu informieren.";
    }

    if (value == "18. November 2022") {
        // Eine neue Row erstellen
        var row = table.insertRow(4);

        // Neue Zellen zu Row hinzufügen
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        // Text hinzufügen
        cell1.innerHTML = "#Zx4";
        cell2.innerHTML = "Wir gehen aktuell von einem Datenabfluss in einem Umfang von mehr als 10 TB aus. Zum aktuellen Zeitpunkt wurden noch keine Datei-Inhalte veröffentlicht.";
        cell3.innerHTML = "04. Dezember 2022";




         // Eine neue Row erstellen
         var row2 = table.insertRow(4);

         // Neue Zellen zu Row hinzufügen
         var cell1 = row2.insertCell(0);
         var cell2 = row2.insertCell(1);
         var cell3 = row2.insertCell(2);
 
         // Text hinzufügen
         cell1.innerHTML = "#Zx4";
         cell2.innerHTML = "Beginn der Analyse und Identifizierung der betroffenen Daten.";
         cell3.innerHTML = "25. November 2022";
 

        // Update des Zuletzt aktualisiert Datums
        setTimeout(function () {
            updateDate3();
        }, 500);

        // Update des Zuletzt aktualisiert Datums
        setTimeout(function () {
            updateDate33();
        }, 1400);

        // Button text change
        var buttonforward = document.getElementById("buttonmessage").textContent = "Weiter zur Umfrage";
    }

    function updateDate1() {
        // Update des aktuellen Datums
        var dateActual = document.getElementById("date-update3").textContent = "13. November 2022";

        // Update des Zuletzt aktualisiert Datums
        var date = document.getElementById("date-update2").textContent = "10. November 2022";

        // Kurzfristig Datum andere Farbe
        document.getElementById("date-update2").style.color = "rgb(255,0,0)";
        document.getElementById("date-update3").style.color = "rgb(255,0,0)";
    }

    function updateDate11() {
        document.getElementById("date-update3").style.color = "rgb(0,0,0)";
        document.getElementById("date-update2").style.color = "rgb(0,0,0)";
    }

    function updateDate2() {
        // Update des aktuellen Datums
        var dateActual = document.getElementById("date-update3").textContent = "20. November 2022";

        // Update des Zuletzt aktualisiert Datums
        var date = document.getElementById("date-update2").textContent = "18. November 2022";

        // Kurzfristig Datum andere Farbe
        document.getElementById("date-update2").style.color = "rgb(255,0,0)";
        document.getElementById("date-update3").style.color = "rgb(255,0,0)";
    }

    function updateDate22() {
        document.getElementById("date-update3").style.color = "rgb(0,0,0)";
        document.getElementById("date-update2").style.color = "rgb(0,0,0)";
    }

    function updateDate3() {
        // Update des aktuellen Datums
        var dateActual = document.getElementById("date-update3").textContent = "18. Dezember 2022";

        // Update des Zuletzt aktualisiert Datums
        var date = document.getElementById("date-update2").textContent = "04. Dezember 2022";

        // Kurzfristig Datum andere Farbe
        document.getElementById("date-update2").style.color = "rgb(255,0,0)";
        document.getElementById("date-update3").style.color = "rgb(255,0,0)";
    }

    function updateDate33() {
        document.getElementById("date-update3").style.color = "rgb(0,0,0)";
        document.getElementById("date-update2").style.color = "rgb(0,0,0)";
    }
}


// Pop-up und Status-Updates starten
function updateNT() {
    var week = 0;

    // Pop-Up entfernen
    let pop = document.getElementById("popup1");
    pop.classList.remove("open-popup");

    let blur = document.getElementById("blur");
    blur.classList.toggle("deactive");
    blur.classList.remove("active");

    var value = document.getElementById("date-update3").textContent;

    if (value == "08. November 2022") {

        // Update des Zuletzt aktualisiert Datums
        setTimeout(function () {
            updateDate1();
        }, 500);

        // Update des Zuletzt aktualisiert Datums
        setTimeout(function () {
            updateDate11();
        }, 1400);

        // Text Pop-Up ändern
        var date = document.getElementById("popup-text-change").textContent = "Eine weitere Woche nach Bekanntgabe der Datenschutzverletzung ist vergangen. Sie besuchen die Website erneut, um sich über neue Sicherheits-Updates im Hinblick auf die Datenschutzverletzung zu informieren.";

        // Button text change
        var buttonforward = document.getElementById("buttonmessage").textContent = "Nächster Schritt";
    }

    if (value == "13. November 2022") {

        // Update des Zuletzt aktualisiert Datums
        setTimeout(function () {
            updateDate2();
        }, 500);

        // Update des Zuletzt aktualisiert Datums
        setTimeout(function () {
            updateDate22();
        }, 1400);

        // Text Pop-Up ändern
        var date = document.getElementById("popup-text-change").textContent = "Inzwischen ist ein Monat nach Bekanntgabe der Datenschutzverletzung vergangen. Sie besuchen die Website erneut, um sich über neue Sicherheits-Updates im Hinblick auf die Datenschutzverletzung zu informieren.";
    }

    if (value == "20. November 2022") {

        // Update des Zuletzt aktualisiert Datums
        setTimeout(function () {
            updateDate3();
        }, 500);

        // Update des Zuletzt aktualisiert Datums
        setTimeout(function () {
            updateDate33();
        }, 1400);

        // Button text change
        var buttonforward = document.getElementById("buttonmessage").textContent = "Weiter zur Umfrage";
    }

    function updateDate1() {
        // Update des aktuellen Datums
        var dateActual = document.getElementById("date-update3").textContent = "13. November 2022";
        // Kurzfristig Datum andere Farbe
        document.getElementById("date-update3").style.color = "rgb(255,0,0)";
    }

    function updateDate11() {
        document.getElementById("date-update3").style.color = "rgb(0,0,0)";
        // Update des Zuletzt aktualisiert Datums
        document.getElementById("date-update2").style.color = "rgb(0,0,0)";
    }

    function updateDate2() {
        // Update des aktuellen Datums
        var dateActual = document.getElementById("date-update3").textContent = "20. November 2022";
        // Kurzfristig Datum andere Farbe
        document.getElementById("date-update3").style.color = "rgb(255,0,0)";
    }

    function updateDate22() {
        document.getElementById("date-update3").style.color = "rgb(0,0,0)";
        // Update des Zuletzt aktualisiert Datums
        document.getElementById("date-update2").style.color = "rgb(0,0,0)";
    }

    function updateDate3() {
        // Update des aktuellen Datums
        var dateActual = document.getElementById("date-update3").textContent = "08. Dezember 2022";
        // Kurzfristig Datum andere Farbe
        document.getElementById("date-update3").style.color = "rgb(255,0,0)";
    }

    function updateDate33() {
        document.getElementById("date-update3").style.color = "rgb(0,0,0)";
        // Update des Zuletzt aktualisiert Datums
        document.getElementById("date-update2").style.color = "rgb(0,0,0)";
    }
}


// Slidefunktion
function sliderMain() {
    var slides = new Array(
        "slide1",
        "slide2",
        "slide3"
    );

    var images = new Array(
        "image1",
        "image2",
        "image3"
    );

    var dots = new Array(
        "dot1",
        "dot2",
        "dot3"
    );

    var i = 0;
    var dot2 = document.getElementById(dots[1]);
    var dot3 = document.getElementById(dots[2]);

    slider(), color(), resetZoom();

    function slider() {

        if (i > 2) {
            // Farbe der Punktleiste wieder auf durchsichtig ändern wenn auf das erste Bild zurückgesprungen wird
            dot2.style.background = '#00000000';
            dot3.style.background = '#00000000';

            i = 0;
        }

        var slide = document.getElementById(slides[i]);
        slide.checked = true;

        // Zoom-Effekt Bild hinzufügen
        var image = document.getElementById(images[i]);
        image.classList.remove("zoomedIn");
        image.classList.add("zoomOut");

        // Setzt Zoom des Bildes zurück 
        setTimeout(resetZoom, 10000);

        // Setzt Farbe der 
        setTimeout(color, 800);

        i++;

        // Startet den Wechsel zum nächsten Bild
        setTimeout(slider, 6000);
    }

    function color() {
        if (i > 0) {
            var dot = document.getElementById(dots[i - 1]);
            dot.style.background = 'rgba(255, 255, 255, 0.6)';
        }
    }

    // Setzt den Bild-Zoom zurück
    function resetZoom() {
        var resetImage;
        // Setzt letztes Bild auf Reset, wenn i wieder auf = 1 springt
        if (i == 1) {
            resetImage = document.getElementById("image3");
        } else {
            resetImage = document.getElementById(images[i - 2]);
        }
        resetImage.classList.remove("zoomOut");
        resetImage.classList.add("zoomedIn");
    }
}

function disposeLoadMessage() {
    setTimeout(
        function () {
            document.getElementById('loadMessage').style.color = 'rgba(0,0,0,0)';
        }, 5000);
}

