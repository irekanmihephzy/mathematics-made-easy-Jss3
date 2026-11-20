'use strict';

const questions = [
  {
    id: 1, year: 2022, topic: "Number", prompt: "Calculate ¾ + ⅖. Give your answer as a mixed number.",
    options: ["1 ³⁄₂₀", "1 ¹⁄₁₀", "1 ⁷⁄₂₀", "1 ¹⁄₂₀"], answer: 0,
    explanation: "Use a common denominator of 20: ¾ = ¹⁵⁄₂₀ and ⅖ = ⁸⁄₂₀. Their sum is ²³⁄₂₀ = 1 ³⁄₂₀."
  },
  {
    id: 2, year: 2022, topic: "Percentages", prompt: "A school has 240 JSS students. If 15% are in JSS3, how many JSS3 students are there?",
    options: ["24", "30", "36", "40"], answer: 2,
    explanation: "15% of 240 = ¹⁵⁄₁₀₀ × 240 = 36 students."
  },
  {
    id: 3, year: 2022, topic: "Algebra", prompt: "Find the value of x if 4x + 3 = 27.",
    options: ["5", "6", "7", "8"], answer: 1,
    explanation: "Subtract 3 from both sides: 4x = 24. Divide by 4, so x = 6."
  },
  {
    id: 4, year: 2023, topic: "Ratio", prompt: "The ratio of red to blue beads is 3 : 5. If there are 64 beads altogether, how many are red?",
    options: ["8", "24", "32", "40"], answer: 1,
    explanation: "There are 3 + 5 = 8 equal parts. Each part is 64 ÷ 8 = 8 beads, so the 3 red parts contain 3 × 8 = 24 beads."
  },
  {
    id: 5, year: 2023, topic: "Commercial arithmetic", prompt: "Find the simple interest on ₦5,000 for 2 years at 8% per annum.",
    options: ["₦400", "₦600", "₦800", "₦1,000"], answer: 2,
    explanation: "Simple interest = PRT ÷ 100 = 5,000 × 8 × 2 ÷ 100 = ₦800."
  },
  {
    id: 6, year: 2023, topic: "Geometry", prompt: "Two angles in a triangle are 48° and 67°. Find the third angle.",
    options: ["55°", "65°", "75°", "85°"], answer: 1,
    explanation: "Angles in a triangle sum to 180°. The third angle is 180° − 48° − 67° = 65°."
  },
  {
    id: 7, year: 2024, topic: "Algebra", prompt: "Solve 3x − 7 = 14.",
    options: ["5", "6", "7", "8"], answer: 2,
    explanation: "Add 7 to both sides to get 3x = 21. Divide by 3: x = 7."
  },
  {
    id: 8, year: 2024, topic: "Mensuration", prompt: "A triangle has a base of 12 cm and a perpendicular height of 7 cm. Find its area.",
    options: ["19 cm²", "42 cm²", "84 cm²", "168 cm²"], answer: 1,
    explanation: "Area of a triangle = ½ × base × height = ½ × 12 × 7 = 42 cm²."
  },
  {
    id: 9, year: 2024, topic: "Number", prompt: "Evaluate √196.",
    options: ["12", "13", "14", "16"], answer: 2,
    explanation: "14 × 14 = 196, so the principal square root of 196 is 14."
  },
  {
    id: 10, year: 2025, topic: "Mensuration", prompt: "A circle has a diameter of 14 cm. Find its circumference. Use π = ²²⁄₇.",
    options: ["22 cm", "44 cm", "88 cm", "154 cm"], answer: 1,
    explanation: "Circumference = πd = ²²⁄₇ × 14 = 44 cm."
  },
  {
    id: 11, year: 2025, topic: "Statistics", prompt: "Find the mean of 4, 7, 9 and 10.",
    options: ["7", "7.5", "8", "30"], answer: 1,
    explanation: "Add the values: 4 + 7 + 9 + 10 = 30. Divide by the 4 values: 30 ÷ 4 = 7.5."
  },
  {
    id: 12, year: 2025, topic: "Number", prompt: "Convert 2.4 kilometres to metres.",
    options: ["24 m", "240 m", "2,400 m", "24,000 m"], answer: 2,
    explanation: "1 kilometre = 1,000 metres, so 2.4 × 1,000 = 2,400 metres."
  },
  {
    id: 13, year: 2026, topic: "Probability", prompt: "A fair six-sided die is rolled once. What is the probability of getting an even number?",
    options: ["⅙", "⅓", "½", "⅔"], answer: 2,
    explanation: "The even outcomes are 2, 4 and 6: 3 favourable outcomes out of 6. The probability is 3⁄6 = ½."
  },
  {
    id: 14, year: 2026, topic: "Mensuration", prompt: "Find the volume of a cuboid measuring 8 cm by 5 cm by 3 cm.",
    options: ["16 cm³", "40 cm³", "120 cm³", "240 cm³"], answer: 2,
    explanation: "Volume of a cuboid = length × width × height = 8 × 5 × 3 = 120 cm³."
  },
  {
    id: 15, year: 2026, topic: "Algebra", prompt: "Simplify 5a + 3b − 2a + b.",
    options: ["3a + 4b", "7a + 2b", "3a + 2b", "7a + 4b"], answer: 0,
    explanation: "Combine like terms: 5a − 2a = 3a and 3b + b = 4b. The expression is 3a + 4b."
  }
];

const topics = ["All topics", ...new Set(questions.map((question) => question.topic))];
const savedProgress = JSON.parse(localStorage.getItem("maths-made-easy-progress") || "{}");
const answered = new Set(Array.isArray(savedProgress.answered) ? savedProgress.answered : []);
const correct = new Set(Array.isArray(savedProgress.correct) ? savedProgress.correct : []);
let selectedTopic = "All topics";

const questionList = document.getElementById("question-list");
const topicFilters = document.getElementById("topic-filters");
const yearFilter = document.getElementById("year-filter");
const searchInput = document.getElementById("search-input");

function saveProgress() {
  localStorage.setItem("maths-made-easy-progress", JSON.stringify({
    answered: [...answered],
    correct: [...correct]
  }));
}

function updateStats() {
  const totalAnswered = answered.size;
  const totalCorrect = correct.size;
  const percent = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  document.getElementById("streak-count").textContent = totalAnswered;
  document.getElementById("answered-stat").textContent = totalAnswered;
  document.getElementById("correct-stat").textContent = totalCorrect;
  document.getElementById("progress-label").textContent = `${percent}%`;
  document.getElementById("progress-bar").style.width = `${percent}%`;
}

function createTopicFilters() {
  topicFilters.replaceChildren();
  topics.forEach((topic) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-chip${topic === selectedTopic ? " active" : ""}`;
    button.textContent = topic;
    button.setAttribute("aria-pressed", String(topic === selectedTopic));
    button.addEventListener("click", () => {
      selectedTopic = topic;
      createTopicFilters();
      renderQuestions();
    });
    topicFilters.append(button);
  });
}

function createQuestionCard(question, visibleNumber) {
  const card = document.createElement("article");
  card.className = "question-card";
  card.dataset.questionId = question.id;

  const meta = document.createElement("div");
  meta.className = "question-meta";
  const topic = document.createElement("span");
  topic.className = "topic-tag";
  topic.textContent = question.topic;
  const year = document.createElement("span");
  year.className = "set-tag";
  year.textContent = `${question.year} practice`;
  const number = document.createElement("span");
  number.className = "question-number";
  number.textContent = `QUESTION ${String(visibleNumber).padStart(2, "0")}`;
  meta.append(topic, year, number);

  const prompt = document.createElement("p");
  prompt.className = "question-text";
  prompt.textContent = question.prompt;

  const options = document.createElement("div");
  options.className = "options";
  options.setAttribute("role", "group");
  options.setAttribute("aria-label", `Answer options for question ${visibleNumber}`);
  const feedback = document.createElement("div");
  feedback.className = "answer-feedback";
  feedback.setAttribute("aria-live", "polite");
  const checkButton = document.createElement("button");
  checkButton.type = "button";
  checkButton.className = "check-button";
  checkButton.textContent = "Check answer";
  const questionActions = document.createElement("div");
  questionActions.className = "question-actions";
  questionActions.append(checkButton, feedback);

  let selectedAnswer = null;
  let submitted = false;
  const optionButtons = question.options.map((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      if (submitted) return;
      selectedAnswer = index;
      optionButtons.forEach((optionButton, optionIndex) => {
        const isSelected = optionIndex === index;
        optionButton.classList.toggle("selected", isSelected);
        optionButton.setAttribute("aria-pressed", String(isSelected));
      });
      checkButton.disabled = false;
      feedback.textContent = "";
      feedback.className = "answer-feedback";
    });
    options.append(button);
    return button;
  });

  checkButton.disabled = true;
  checkButton.addEventListener("click", () => {
    if (selectedAnswer === null || submitted) return;
    submitted = true;
    answered.add(question.id);
    const isCorrect = selectedAnswer === question.answer;
    if (isCorrect) correct.add(question.id);
    optionButtons.forEach((button, index) => {
      button.disabled = true;
      if (index === question.answer) button.classList.add("correct");
      else if (index === selectedAnswer) button.classList.add("incorrect");
    });
    feedback.className = `answer-feedback ${isCorrect ? "success" : "try-again"}`;
    feedback.textContent = `${isCorrect ? "That’s right! " : "Not quite. "}${question.explanation}`;
    checkButton.disabled = true;
    checkButton.textContent = isCorrect ? "Correct ✓" : "Reviewed";
    updateStats();
    saveProgress();
  });

  if (answered.has(question.id)) {
    submitted = true;
    checkButton.disabled = true;
    checkButton.textContent = "Already answered";
    optionButtons.forEach((button, index) => {
      button.disabled = true;
      if (index === question.answer) button.classList.add("correct");
    });
    feedback.className = `answer-feedback ${correct.has(question.id) ? "success" : ""}`;
    feedback.textContent = `${correct.has(question.id) ? "You got this right. " : "Review the solution. "}${question.explanation}`;
  }

  card.append(meta, prompt, options, questionActions);
  return card;
}

function renderQuestions() {
  const year = yearFilter.value;
  const query = searchInput.value.trim().toLowerCase();
  const filtered = questions.filter((question) => {
    const matchesTopic = selectedTopic === "All topics" || question.topic === selectedTopic;
    const matchesYear = year === "all" || String(question.year) === year;
    const matchesSearch = !query || `${question.prompt} ${question.topic} ${question.options.join(" ")}`.toLowerCase().includes(query);
    return matchesTopic && matchesYear && matchesSearch;
  });

  questionList.replaceChildren(...filtered.map((question, index) => createQuestionCard(question, index + 1)));
  document.getElementById("empty-state").hidden = filtered.length !== 0;
  document.getElementById("results-count").textContent = filtered.length === questions.length
    ? `Showing all ${questions.length} questions`
    : `Showing ${filtered.length} of ${questions.length} questions`;
}

yearFilter.addEventListener("change", renderQuestions);
searchInput.addEventListener("input", renderQuestions);
document.getElementById("clear-filters").addEventListener("click", () => {
  selectedTopic = "All topics";
  yearFilter.value = "all";
  searchInput.value = "";
  createTopicFilters();
  renderQuestions();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

createTopicFilters();
renderQuestions();
updateStats();