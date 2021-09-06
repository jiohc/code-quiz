// quiz questions
var myQuestions = [
    {
        question: "Which one of the following is NOT a way JavaScript can 'display' data?",
        answers: [
            "window.alert()",
            "console.log()",
            "innerHTML",
            "output.log()"
        ],
        correctAnswer: "output.log()"
    },
    {
        question: "__________ are containers for storing data.",
        answers: [
            "functions",
            "variables",
            "Booleans",
            "numbers"
        ],
        correctAnswer: "variables"
    },
    {
        question: "__________ is the comparison operator for strict equality.",
        answers: [
            "=",
            "!==",
            "||",
            "==="
        ],
        correctAnswer: "==="
    },
    {
        question: "JavaScript _______ are used for _______ and manipulating text.",
        answers: [
            "strings, storing",
            "functions, calling",
            "numbers, adding",
            "events, reacting"
        ],
        correctAnswer: "strings, storing"
    },
    {
        question: "Which of the following is NOT a common method to round a number to an integer?",
        answers: [
            "Math.round",
            "Math.floor",
            "Math.zero",
            "Math.ceil"
        ],
        correctAnswer: "Math.zero"
    },
    {
        question: "Which of the following is a primitive data type?",
        answers: [
            "undefined",
            "prime",
            "string",
            "object"
        ],
        correctAnswer: "undefined"
    },
    {
        question: "_______ is used to wrap an array.",
        answers: [
            "''",
            "{}",
            "[]",
            "()"
        ],
        correctAnswer: "[]"
    },
    {
        question: "Which is not a JavaScript Framework?",
        answers: [
            "JQuery",
            "Django",
            "NodeJS",
            "Python Script"
        ],
        correctAnswer: "Django"
    },
    {
        question: "What does CSS stand for?",
        answers: [
            "Controlling Style Sheets",
            "Cascading Style Scripts",
            "Cascading Section Scripts",
            "Cascading Style Sheets"
        ],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        question: "Who invented JavaScript?",
        answers: [
            "Sheryl Sandberg",
            "James 'Java' Script",
            "Douglas Crockford",
            "Brendan Eich"
        ],
        correctAnswer: "Brendan Eich"
    }
];

var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");



// Seconds left is 15 seconds per question:
var secondsLeft = 90;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");

// Triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < myQuestions.length; i++) {
        // Appends question title only
        var userQuestion = myQuestions[questionIndex].question;
        var userChoices = myQuestions[questionIndex].answers;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == myQuestions[questionIndex].correctAnswer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + myQuestions[questionIndex].correctAnswer;
            // Correct condition 
        } else {
            // Will deduct -10 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + myQuestions[questionIndex].correctAnswer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= myQuestions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + myQuestions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// All done will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./HighScores.html");
        }
    });

}