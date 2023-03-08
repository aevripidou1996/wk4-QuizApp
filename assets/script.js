// Array of the quiz questions, the choices to choose from, and the correct answer
var questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hypertext Machine Language", "Hypertext Tools Markup Links", "Hypertext Markup Language", "High-Tech Markup Lists"],
        answer: "Hypertext Markup Language"
    },
    {
        question: 'What does CSS stand for?',
        options: ["Central Style Sheets", "Cascading Style Sheets", "Cars Ships Snakes", "Cascading Simple Sheets",],
        answer: "Cascading Style Sheets"
    },
    {
        question: "What year was JavaScrript created in?",
        options: ['1969', '2021', '1995', '2001'],
        answer: '1995'
    },

    {
        question: "Who created JavaScript?",
        options: ["Brendan Eich", 'God', "Godzilla", "Brendan Frazer",],
        answer: "Brendan Eich"
    },

    {
        question: "Which language runs in a web browser",
        options: ["Java", 'HTML', 'CSS', "JavaScript",],
        answer: "JavaScript"
    }
]


// creating a score and timmer for my quiz app
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

// creating a function that will start a timmer once the quiz has started
function start() {
    timeLeft = 60;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;

        //creating an if statment to stop the game once time has run out
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }

    }, 1000);

    next();
}

// creating a function that will stop the game once all the answers have been created
function endGame() {
    clearInterval(timer);

    var quizContent = `
        <h2>Game over!</h2>
        <h3>You got a ` + score + ` /100!</h3>
        <h3>That means you got ` + score / 20 + ` questions correct!</h3>
        <input type="text" id="name" placeholder="Please enter your initals">
        <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    getScore();
}

function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br>
    <button onclick="clearScore()">Clear score</button><button onclick="resetGame()">Play again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");

    resetGame();
}

function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        Coding Quiz!
    </h1>
    <h3>
        Click Start to play!
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;

}

function incorrect() {
    timeLeft -= 10;
    next();
}

function correct() {
    score += 10;
    next()
}
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].question + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].options.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>";
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].options[buttonLoop]);

        if (questions[currentQuestion].options[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }

    document.getElementById("quizBody").innerHTML = quizContent;
}


