const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question:"What is Bootstrap?",
    choice1: "A lace that tightens your boots",
    choice2: "A function that enables you style in JS",
    choice3:"CSS Framework for developing responsive and mobile-first websites",
    choice4: "Object Model for HTML",
    answer: 3,
  },

  {
    question: "What does MVC stand for?",
    choice1: "Movie Video Conference",
    choice2: "Model View Controller",
    choice3: "Moving Vehicle Control",
    choice4: "Model Visual Connection",
    answer: 2,
  },

  
  {
    question: "What is AJAX ?",
    choice1: "Cleaning product for our home.",
    choice2: "Set of techniques to create asynchronous web applications.",
    choice3: "Methods to render HTML elements.",
    choice4: "A format used for data exchange",
    answer: 2,
  },

  {
    question: "What is the HTML DOM ?",
    choice1: "Is an API (Programming Interface) for JavaScript.",
    choice2: "Events of all HTML elements.",
    choice3: "Methods for all HTML elements.",
    choice4: "Properties for all HTML elemnts.",
    answer: 1,
  },

  {
    question: "What is a Command Line Input?",
    choice1: "A set of commands that enable us to run Node.js.",
    choice2: "A set of commands that enable us to deploy up to Heroku",
    choice3:"command line program that accepts text input to execute operating system functions",
    choice4: "Enables us to fetch JSON from the server",
    answer: 3,
  },

  {
    question: "What is jQuery?",
    choice1: "A set of questions for JavaScript.",
    choice2: "Is a JavaScript library.",
    choice3: "Is an extension of JavaScript to create Algorithms.",
    choice4: "Enables you to create images.",
    answer: 2,
  },

  {
    question: "What does npm stand for?",
    choice1: "National Program monitoring",
    choice2: "Node Program Model",
    choice3: "Node Package Manager",
    choice4: "User Interface library",
    answer: 3,
  },

  {
    question: "What is React?",
    choice1:"Is tool for building UI components, a user interface library,and a Javascript library",
    choice2: "Is a npm, run on CLI,and a Javascript library",
    choice3: "Is an API, a feature on Facebook,and enable people to communicate",
    choice4: "Is used to ensure your Algorithm is correct.",
    answer: 1,
  },

  {
    question: "What is JavaScript ?",
    choice1: "An extension of HTML and CSS",
    choice2:"A Programming language used for both front and back end",
    choice3: "Is about communcation between web clients and servers",
    choice4: "Enables your local routes to work",
    answer: 2,
  },

  {
    question: "What is a For Loop ?",
    choice1: "Creates a circle in CSS",
    choice2:"A Programming language",
    choice3: "Is about communcation between web clients and servers",
    choice4: "control flow statement for specifying iteration",
    answer: 4,
  }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign('./end.html');
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.getElementsByClassName.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);
  acceptingAnswers = true;
}

choices.forEach((choice) => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswers = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswers == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    progressBarFull.textContent = classToApply
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      progressBarFull.textContent = "";
      getNewQuestion();
    }, 1000);
  });
});

let incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
