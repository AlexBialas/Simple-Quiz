const questions = [
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
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(answer) {
  const buttons = answerButtons.childNodes;
  buttons.forEach((button) => {
    button.disabled = true;
    if (button.innerHTML === answer.text) {
      button.classList.add(answer.correct ? "correct" : "incorrect");
    }
  });

  if (answer.correct) {
    score++;
  } else {
    const correctAnswer = questions[currentQuestionIndex].answers.find(
      (a) => a.correct
    );
    const correctButton = document.createElement("button");
    correctButton.innerHTML = `Right Answer: ${correctAnswer.text}`;
    correctButton.classList.add("btn", "correct-answer");
    correctButton.disabled = true;
    answerButtons.appendChild(correctButton);
  }

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = "block";
  nextButton.addEventListener("click", startQuiz);
}

startQuiz();
