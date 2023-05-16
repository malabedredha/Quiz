let quizDiv = document.querySelector("#Quiz");
let questionButton1 = document.querySelector("#answer1");
let questionButton2 = document.querySelector("#answer2");
let questionButton3 = document.querySelector("#answer3");
let questionButton4 = document.querySelector("#answer4");
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let timerA = document.querySelector("#timer-1");
let timer = 60
let submitButton = document.querySelector("#submit")
let fullName = document.querySelector("#fname")
let startQuiz = document.querySelector("#Begin-Quiz")
let timerId
let gameEnd = document.querySelector("#End-Quiz")
highScores.textContent = "highScores"
let scoreBoard = document.querySelector("#scoreboard")
let finEnd = document.querySelector("#finalS")

//Starts the quiz
startQuiz.addEventListener("click", function () {

    startQuiz.classList.add("hide");
    quizDiv.classList.remove("hide");
    startTimer();

})

// Timer
function startTimer() {

    timerA.textContent = timer;

    timerId = setInterval(function () {

        timer -= 1
        console.log(timer);
        if (timer === 0) {

            endQuiz();

        }
        timerA.textContent = timer;

    }, 1000)

}

// The Questions and the answers
let questions = [

    { question: " 1, What is the name of the main character in The Godfather?", answers: ["Francis Ford Coppola", "Vito Corleone", "Al Pacino", "Mario Puzo"], correctAnswer: "Vito Corleone" },

    { question: "2, Who directed The Godfather?", answers: ["Francis Ford Coppola", "Vito Corleone", "Al Pacino", "Mario Puzo"], correctAnswer: "Francis Ford Coppola" },

    { question: "3, What is the name of the actor who played Michael Corleone in The Godfather?", answers: ["Francis Ford Coppola", "Vito Corleone", "Al Pacino", "Mario Puzo"], correctAnswer: "Al Pacino" },

    { question: "4, What is the famous line that Vito Corleone says to Bonasera in the opening scene of The Godfather?", answers: ["I'm gonna make him an offer he can't refuse.", "It's not personal, Sonny. It's strictly business.", "Leave the gun. Take the cannoli.", "I don't like violence, Tom. I'm a businessman. Blood is a big expense."], correctAnswer: "I'm gonna make him an offer he can't refuse." },

    { question: "5, How many Godfather movies are there?", answers: ["1", "2", "3", "4"], correctAnswer: "3" },

]

let currentQuestion = 0

renderQuestion();

// Question rendering
function renderQuestion() {

    question.textContent = questions[currentQuestion].question
    questionButton1.textContent = questions[currentQuestion].answers[0]
    questionButton2.textContent = questions[currentQuestion].answers[1]
    questionButton3.textContent = questions[currentQuestion].answers[2]
    questionButton4.textContent = questions[currentQuestion].answers[3]
    console.log("correct answer:" + questions[currentQuestion].correctAnswer)

}

// lets the user know if they're correct or not and adjust points and timer
quizDiv.addEventListener("click", function (event) {

    if (event.target.matches("button")) {

        console.log("Clicked!")
        console.log("Value:" + event.target.innerText);
        console.log("Correct Answer:" + questions[currentQuestion].correctAnswer)
        correctAnswer.textContent = "Correct"

        if (event.target.innerText !== questions[currentQuestion].correctAnswer) {

            timer -= 10
            correctAnswer.textContent = "Incorrect"

        }

        console.log(currentQuestion)
        console.log(questions.length)
        currentQuestion++
        if (currentQuestion === questions.length) {

            endQuiz();

            return
        }
        renderQuestion();
        finEnd.textContent = "Final Score... " + timer
    }
})


// the end of the the quiz
function endQuiz() {

    clearInterval(timerId);
    gameEnd.classList.remove("hide")
    startQuiz.classList.add("hide")
    quizDiv.classList.add("hide")

}

// submitting scores
submitButton.addEventListener("click", function (event) {

    event.preventDefault()
    let finalScore = {
        name: fullName.value,
        timer: timer,
    }
    console.log(finalScore)
    highScores.push(finalScore)
    localStorage.setItem("highScores", JSON.stringify(highScores));
    renderScores();

})

function renderScores() {
    for (let i = 0; i < highScores.length; i++) {
        let highScore = document.createElement("li")
        highScore.textContent =highScores[i].timer + "-" + highScores[i].name;
        scoreBoard.appendChild(highScore)
    }
}