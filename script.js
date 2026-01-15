const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currectQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz Data
const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Mark Twain", correct: false },
            { text: "Jane Austen", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
            { text: "Fe", correct: false },
            { text: "Pb", correct: false }
        ]
    },
    {
        question: "Which country hosted the 2016 Summer Olympics?",
        answers: [
            { text: "China", correct: false },
            { text: "Brazil", correct: true },
            { text: "UK", correct: false },
            { text: "Russia", correct: false }
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Iron", correct: false },
            { text: "Diamond", correct: true },
            { text: "Silver", correct: false }
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Claude Monet", correct: false }
        ]
    },
    {
        question: "Who Composed Sogno di Volare?",
        answers: [
            { text: "Christopher Tin", correct: true },
            { text: "John Williams", correct: false },
            { text: "Ennio Morricone", correct: false },
            { text: "James Horner", correct: false }
        ]
    },
    {
        question: "Who created the game 'Civilization Series'?",
        answers: [
            { text: "Sid Meier", correct: true },
            { text: "John Carmack", correct: false },
            { text: "Shigeru Miyamoto", correct: false },
            { text: "Will Wright", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    currectQuestionSpan.textContent = 1;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    resultScreen.classList.remove("active");

    showQuestion();
}

function showQuestion() {
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    const progressPercent =
        ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answers-btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return;
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    Array.from(answersContainer.children).forEach((button) => {
        button.classList.add(
            button.dataset.correct === "true" ? "correct" : "incorrect"
        );
        button.disabled = true;
    });

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            currectQuestionSpan.textContent = currentQuestionIndex + 1;
            showQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    resultMessage.textContent =
        score / quizQuestions.length >= 0.7
            ? "Congratulations! You passed the quiz."
            : "Better luck next time!";
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}
