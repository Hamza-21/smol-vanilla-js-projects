const startButton = document.getElementById("start");
const nextButton = document.getElementById("next");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("questions");
const answerKeys = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex; //defines the variables as undefined

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  nextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  //shuffledQuestions takes the questions array and sorts it according the math.random
  //math.random returns a random number between 0-1, we subtract that number by 0.5
  //because of this, everytime there is a change in the index.
  currentQuestionIndex = 0;
  //we always need to start from the first question that is selected by shuffledQuestions
  questionContainer.classList.remove("hide");
  nextQuestion();
}

function nextQuestion() {
  resetUI();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");

    if (answer.correct) {
      button.dataset.correct = answer.correct; //dataset allows us to access the data attributes of the DOM
      //in this case it is accessing boolean true or false
    }
    button.addEventListener("click", selectAnswer);
    answerKeys.appendChild(button);
  });
}

function resetUI() {
  clearStatus(document.body);
  nextButton.classList.add("hide");

  while (answerKeys.firstChild) {
    answerKeys.removeChild(answerKeys.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target; //e.target targets the button/element that is selected or clicked
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct); //this function defines whether or not the answer selected is true or false

  Array.from(answerKeys.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart Quiz";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatus(element);

  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatus(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "Tamil Nadu", correct: false },
      { text: "Delhi", correct: true },
      { text: "Mumbai", correct: false },
      { text: "Uttar Pradesh", correct: false },
    ],
  },
  {
    question: "Where is the longest river located?",
    answers: [
      { text: "India", correct: false },
      { text: "Egpyt", correct: true },
      { text: "Ecuador", correct: false },
      { text: "Russia", correct: false },
    ],
  },
  {
    question: "What is the 2 + 2?",
    answers: [
      { text: "22", correct: false },
      { text: "4", correct: true },
      { text: "11", correct: false },
      { text: "0", correct: false },
    ],
  },
];
