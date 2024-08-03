document.addEventListener('DOMContentLoaded', function () {

    // Nudges anzeigen und Kontrollfragen
    fetchExperimentNumber((expNumber) => {
        experimentNumber = expNumber; // Experimentnummer im globalen Scope setzen

        // Wenn die experimentNumber gleich 1 oder 2 ist, zeige die unteren Teile nicht an
        if (experimentNumber === 1 || experimentNumber === 2) {
            const cardLowers = document.querySelectorAll('.card-lower');
            cardLowers.forEach(cardLower => {
                cardLower.style.display = 'none';
            });
            // Default Kontrollfrage anzeigen
            const controlQuestionDefault = document.getElementById('controlQuestionDefault');
            if (controlQuestionDefault) controlQuestionDefault.style.display = 'block';
        }

        // Wenn die experimentNumber gleich 3 oder 4 ist, zeige die spezifischen Elemente an
        else if (experimentNumber === 3 || experimentNumber === 4) {
            const nudgeLossAversion_1 = document.getElementById('nudgeLossAversion_1');
            if (nudgeLossAversion_1) nudgeLossAversion_1.style.display = 'block';
            const nudgeLossAversion_2 = document.getElementById('nudgeLossAversion_2');
            if (nudgeLossAversion_2) nudgeLossAversion_2.style.display = 'block';
            const nudgeLossAversion_3 = document.getElementById('nudgeLossAversion_3');
            if (nudgeLossAversion_3) nudgeLossAversion_3.style.display = 'block';
            const nudgeLossAversion_4 = document.getElementById('nudgeLossAversion_4');
            if (nudgeLossAversion_4) nudgeLossAversion_4.style.display = 'block';
            // Loss Aversion Kontrollfrage anzeigen
            const controlQuestionLossAversion = document.getElementById('controlQuestionLossAversion');
            if (controlQuestionLossAversion) controlQuestionLossAversion.style.display = 'block';
        }

        // Wenn die experimentNumber gleich 5 oder 6 ist, zeige andere spezifische Elemente an
        else if (experimentNumber === 5 || experimentNumber === 6) {
            const nudgeSocialProof_1 = document.getElementById('nudgeSocialProof_1');
            if (nudgeSocialProof_1) nudgeSocialProof_1.style.display = 'block';
            const nudgeSocialProof_2 = document.getElementById('nudgeSocialProof_2');
            if (nudgeSocialProof_2) nudgeSocialProof_2.style.display = 'block';
            const nudgeSocialProof_3 = document.getElementById('nudgeSocialProof_3');
            if (nudgeSocialProof_3) nudgeSocialProof_3.style.display = 'block';
            const nudgeSocialProof_4 = document.getElementById('nudgeSocialProof_4');
            if (nudgeSocialProof_4) nudgeSocialProof_4.style.display = 'block';
            // Social Proof Kontrollfrage anzeigen
            const controlQuestionSocialProof = document.getElementById('controlQuestionSocialProof');
            if (controlQuestionSocialProof) controlQuestionSocialProof.style.display = 'block';
        }

        fitCards();

    });

    // Event-Listener für den Button hinzufügen
    const delayedButton = document.getElementById('delayedButton');
    delayedButton.addEventListener('click', function () {
        window.location.href = '/ISPkontrolle';
    });
});

function fitCards() {
    // Get all elements with class 'card-lower'
    const cardLowers = document.querySelectorAll('.card-lower');
    let maxHeight = 0;

    // Find the maximum height
    cardLowers.forEach(cardLower => {
        const height = cardLower.offsetHeight;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });

    // Set all card-lower elements to the maximum height
    cardLowers.forEach(cardLower => {
        cardLower.style.height = `${maxHeight}px`;
    });

    // Get all elements with class 'card-title'
    const cardTitles = document.querySelectorAll('.card-title');
    let maxHeightTitle = 0;

    // Find the maximum height for card-title
    cardTitles.forEach(cardTitle => {
        const height = cardTitle.offsetHeight;
        if (height > maxHeightTitle) {
            maxHeightTitle = height;
        }
    });

    // Set all card-title elements to the maximum height
    cardTitles.forEach(cardTitle => {
        cardTitle.style.height = `${maxHeightTitle}px`;
    });
}

// Solange die Antworten falsch sind, kann der Nutzer nicht an dem Experiment teilnehmen und wird zurück zu den Richtlinien geleitet
function redirect3() {
    // Überprüfe den Wert von check1a_ISP
    const isCheck1Correct = document.getElementById('check1a_ISP').checked;

    // Erhalte die aktuelle Experimentnummer
    fetchExperimentNumber((expNumber) => {
        experimentNumber = expNumber; // Experimentnummer im globalen Scope setzen

        // Variablen zur Überprüfung der richtigen Antworten
        let isCheck2Correct = false;
        let isAnswerCorrect = false;

        // Überprüfe die Antworten basierend auf der Experimentnummer
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

        // Entscheidung über die Weiterleitung basierend auf der Richtigkeit der Antworten
        if (isAnswerCorrect) {
            window.location.href = '/login';
        } else {
            window.alert('Leider waren Ihre Angaben nicht korrekt.\nBitte lesen Sie die Richtlinien erneut.');
            window.location.href = '/ISP';
        }
    });
}