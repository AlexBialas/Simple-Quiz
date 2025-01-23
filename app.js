const question = [
  {
    question: "What is the correct syntax to create a function in JavaScript?",
    answers: [
      { text: "function:myFunction() { }", correct: false },
      { text: "function myFunction() { }", correct: true },
      { text: "create myFunction() { }", correct: false },
      { text: "function = myFunction() { }", correct: false },
    ],
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    answers: [
      { text: "Undefined", correct: false },
      { text: "Number", correct: false },
      { text: "Float", correct: true },
      { text: "String", correct: false },
    ],
  },
  {
    question: "How do you write a comment in JavaScript?",
    answers: [
      { text: "// This is a comment", correct: true },
      { text: "# This is a comment", correct: false },
      { text: "/* This is a comment */", correct: true },
      { text: "<!-- This is a comment -->", correct: false },
    ],
  },
  {
    question: "What keyword is used to declare a variable in JavaScript?",
    answers: [
      { text: "var", correct: true },
      { text: "let", correct: true },
      { text: "const", correct: true },
      { text: "variable", correct: false },
    ],
  },
  {
    question:
      "Which of the following is a correct way to create an array in JavaScript?",
    answers: [
      { text: "var arr = [];", correct: true },
      { text: "var arr = {};", correct: false },
      { text: "var arr = (1, 2, 3);", correct: false },
      { text: "var arr = array(1, 2, 3);", correct: false },
    ],
  },
  {
    question:
      "Which method is used to convert a JSON string into a JavaScript object?",
    answers: [
      { text: "JSON.parse()", correct: true },
      { text: "JSON.stringify()", correct: false },
      { text: "JSON.object()", correct: false },
      { text: "JSON.convert()", correct: false },
    ],
  },
  {
    question: "How do you declare a constant in JavaScript?",
    answers: [
      { text: "constant PI = 3.14;", correct: false },
      { text: "const PI = 3.14;", correct: true },
      { text: "let PI = 3.14;", correct: false },
      { text: "var PI = 3.14;", correct: false },
    ],
  },
  {
    question: "What is the output of 'typeof null' in JavaScript?",
    answers: [
      { text: "null", correct: false },
      { text: "undefined", correct: false },
      { text: "object", correct: true },
      { text: "number", correct: false },
    ],
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    answers: [
      { text: "=", correct: true },
      { text: "==", correct: false },
      { text: "===", correct: false },
      { text: ":=", correct: false },
    ],
  },
  {
    question: "What will the following code return: Boolean(0)?",
    answers: [
      { text: "true", correct: false },
      { text: "false", correct: true },
      { text: "undefined", correct: false },
      { text: "NaN", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = "none"; // Hide the next button initially
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text; // Corrected typo here
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer)); // Add click event listener
    answerButton.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none"; // Hide the next button
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild); // Clear previous answers
  }
}

function selectAnswer(answer) {
  if (answer.correct) {
    score++;
  }

  const buttons = answerButton.childNodes;
  buttons.forEach((button) => {
    button.disabled = true; // Disable all buttons after selection
    if (button.innerHTML === answer.text) {
      button.classList.add(answer.correct ? "correct" : "incorrect");
    }
  });

  nextButton.style.display = "block"; // Show the next button
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < question.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = "block"; // Show the restart button
}

nextButton.addEventListener("click", () => {
  startQuiz(); // Restart the quiz
});

startQuiz();
