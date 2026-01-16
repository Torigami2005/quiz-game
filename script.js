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

const videoButton = document.createElement("button");
videoButton.textContent = "Watch Your Fate";
videoButton.classList.add("video-btn");

const quizQuestions = [
    {
        question: "When was Genshin Impact released?",
        answers: [
            { text: "2019", correct: false },
            { text: "2020", correct: true },
            { text: "2021", correct: false },
            { text: "2018", correct: false },
        ],
    },
    {
        question: "Which of these characters is NOT from Genshin Impact?",
        answers: [
            { text: "Diluc", correct: false },
            { text: "Venti", correct: false },
            { text: "Zelda", correct: true },
            { text: "Keqing", correct: false },
        ],
    },
    {
        question: "What is the name of the world in Genshin Impact?",
        answers: [
            { text: "Azeroth", correct: false },
            { text: "Hyrule", correct: false },
            { text: "Teyvat", correct: true },
            { text: "Valoran", correct: false },
        ],
    },
    {
        question: "Which element does the character 'Xiangling' use?",
        answers: [
            { text: "Pyro", correct: true },
            { text: "Hydro", correct: false },
            { text: "Electro", correct: false },
            { text: "Anemo", correct: false },
        ],
    },
    {
        question: "Who is the archon of Nod-Krai?",
        answers: [
            { text: "Zhongli", correct: false },
            { text: "Venti", correct: false },
            { text: "Columbina Hyposelenia", correct: true },
            { text: "Barbatos", correct: false },
        ],
    },
    {
        question: "What is the back story of the artifact set 'Thundering Fury'?",
        answers: [
            { text: "A tale of a storm that never ends", correct: false },
            { text: "A story of a warrior who tamed lightning", correct: false },
            { text: "A legend of a pact made with the Electro Archon", correct: true },
            { text: "A myth about a lost city of thunder", correct: false },
        ],
    },
    {
        question: "Who is the first 5 banner character that was released in Genshin Impact?",
        answers: [
            { text: "Diluc", correct: true },
            { text: "Jean", correct: false },
            { text: "Amber", correct: false },
            { text: "Bennett", correct: false },
        ],
    },
    {
        question: "What do you call players that plays Genshin Impact update ver 1.0?",
        answers: [
            { text: "Fetus", correct: false },
            { text: "OGs", correct: true },
            { text: "NewGen", correct: false },
            { text: "Glazers", correct: false },
        ],
    },
    {
        question: "What do you call Genshin Impact lovers?",
        answers: [
            { text: "Gamers", correct: false },
            { text: "Nerds", correct: false },
            { text: "Weebs", correct: false },
            { text: "Glazers", correct: false },
        ],
    },
    {
        question: "What do you call players who plays Genshin Impact but never take a bath?",
        answers: [
            { text: "Glazers", correct: false },
            { text: "Stinky Bastards", correct: false },
            { text: "Bathless Glazers", correct: true },
            { text: "Nerds", correct: false },
        ],
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

    const scoreRatio = score / quizQuestions.length;

    resultMessage.textContent =
        scoreRatio >= 0.7
            ? "Okay nerd. You know your genshin."
            : "Loser glazer. sucks to be f2p.";

    videoButton.onclick = () => {
        if (scoreRatio >= 0.7) {
            window.location.href = "columbina.mp4";
        } else {
            window.location.href = "qiqi.mp4";
        }
    };

    if (!resultScreen.contains(videoButton)) {
        resultScreen.appendChild(videoButton);
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}
