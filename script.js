let userName = "";
let currentQuestion = 0;
let hintsRemaining = 4;
let timer = 120;
let timerInterval;
let correctAnswers = 0;

// Questions array
const questions = [
  {
    question: "Which is the capital city of Pakistan?",
    hints: ["Islamabad", "Peshawar", "Lahore", "Karachi"],
    correctAnswer: "Islamabad",
    userAnswer: "",
  },
  {
    question: "The external JavaScript file must contain the &ltscript&gt tag?",
    hints: ["True", "False", "All of Above", "None of these"],
    correctAnswer: "False",
    userAnswer: "",
  },
  {
    question: "When was JavaScript invented?",
    hints: ["1995", "2000", "2005", "2010"],
    correctAnswer: "1995",
    userAnswer: "",
  },
  {
    question: "What is the full form of RAM?",
    hints: [
      "Read only memory",
      "Random access memory",
      "Remove all memory",
      "Run all memory",
    ],
    correctAnswer: "Random access memory",
    userAnswer: "",
  },
  {
    question: "What is the full form of DOM?",
    hints: [
      "Document Object Model",
      "Data Object Model",
      "Document Oriented Model",
      "Digital Object Model",
    ],
    correctAnswer: "Document Object Model",
    userAnswer: "",
  },
  // Add more questions
];

// Function to display question
function displayQuestion() {
  const questionContainer = document.getElementById("question");
  const hintsContainer = document.getElementById("hints");

  questionContainer.innerHTML = `<p>${questions[currentQuestion].question}</p>`;
  hintsContainer.innerHTML = "";

  for (let hint of questions[currentQuestion].hints) {
    hintsContainer.innerHTML += `<button class="hint">${hint}</button>`;
  }

  const hintButtons = document.querySelectorAll(".hint");
  hintButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (hintsRemaining > 0) {
        hintButtons.forEach((btn) => {
          btn.classList.remove("hint-selected");
        });

        hintsRemaining--;
        button.disabled = true;
        button.classList.add("hint-selected");

        questions[currentQuestion].userAnswer =
          questions[currentQuestion].hints[index];
      }
    });
  });
}

// Function to start timer
function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    document.getElementById("timer").innerText = timer;
    if (timer <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  const resultContainer = document.getElementById("result");

  correctAnswers = questions.filter(
    (question) => question.userAnswer === question.correctAnswer
  ).length;

  // Calculate percentage
  const percentage = (correctAnswers / questions.length) * 100;

  let result = "";

  if (percentage >= 80) {
    result = "Excellent!";
  } else if (percentage >= 60) {
    result = "Very Good!";
  } else if (percentage >= 40) {
    result = "Good!";
  } else {
    result = "You can do better!";
  }

  resultContainer.innerHTML = `
        <p>Result:</p>
        <p>Name: ${userName}</p>
        <p>Total Questions: ${questions.length}</p>
        <p>Correct Answers: ${correctAnswers}</p>
        <p>Percentage: ${percentage.toFixed(2)}%</p>
        <p>${result}</p>
    `;

  // Show try again and home buttons
  const tryAgainBtn = document.getElementById("try-again-btn");
  const homeBtn = document.getElementById("home-btn");
  const message = document.createElement("p");
  message.innerText = "Thank you for taking the quiz!";
  resultContainer.appendChild(message);
  tryAgainBtn.style.display = "inline-block";
  homeBtn.style.display = "inline-block";
}

document.getElementById("next-btn").addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
});

// Function to handle try again button click
document.getElementById("try-again-btn").addEventListener("click", () => {
  window.location.reload();
});

document.getElementById("home-btn").addEventListener("click", () => {
  window.location.href = "index.html";
});

// Entry point
document.addEventListener("DOMContentLoaded", () => {
  do {
    userName = prompt("Enter your name (at least 3 characters):");
  } while (!userName || userName.trim().length < 3);

  document.getElementById(
    "user-details"
  ).innerText = `Developed by ${userName}`;

  // Display first question
  displayQuestion();

  // Start timer
  startTimer();
});
