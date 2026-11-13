
// ==========================================
// 7EKAYET ARD - MAIN JAVASCRIPT
// ==========================================

// Helpers
const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];


// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");

menuToggle?.addEventListener("click", () => {

  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

});

$$(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks?.classList.remove("open");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

const navbar = $("#navbar");

window.addEventListener("scroll", () => {

  navbar?.classList.toggle(
    "scrolled",
    window.scrollY > 20
  );

}, { passive: true });


// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);

$$(".reveal").forEach(element => {

  revealObserver.observe(element);

});


// ==========================================
// FOOTER YEAR
// ==========================================

const currentYear = $("#currentYear");

if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}


// ==========================================
// STORY INTERACTION
// ==========================================

const storyMore = $("#storyMore");
const storyExtra = $("#storyExtra");

storyMore?.addEventListener("click", () => {

  const opening = storyExtra.hidden;

  storyExtra.hidden = !opening;

  storyMore.innerHTML = opening
    ? "اقفل الجزء <span>−</span>"
    : "كمّل القراءة <span>＋</span>";

});


// ==========================================
// GREENHOUSE INTERACTIVE LAB
// ==========================================

const gasSlider = $("#gasSlider");
const gasValue = $("#gasValue");
const heatResult = $("#heatResult");
const labVisual = $(".lab-visual");

function updateGreenhouse() {

  if (!gasSlider) return;

  const value = Number(gasSlider.value);

  if (gasValue) {

    gasValue.textContent = `${value}%`;

  }

  if (heatResult) {

    if (value < 30) {

      heatResult.textContent = "منخفض في النموذج";

    } else if (value < 70) {

      heatResult.textContent = "متوسط في النموذج";

    } else {

      heatResult.textContent = "مرتفع في النموذج";

    }

  }

  if (labVisual) {

    labVisual.style.setProperty(
      "--heat-level",
      `${value}%`
    );

    labVisual.style.background = `
      radial-gradient(
        circle at 50% 50%,
        rgba(
          255,
          ${Math.round(170 - value * 0.9)},
          ${Math.round(120 - value * 0.75)},
          ${0.08 + value / 260}
        ),
        transparent 58%
      ),
      linear-gradient(145deg,#102c43,#071522)
    `;

  }

}

gasSlider?.addEventListener(
  "input",
  updateGreenhouse
);

updateGreenhouse();


// ==========================================
// CITY SIMULATOR
// ==========================================

const cityInputs = [
  "energySlider",
  "treesSlider",
  "transportSlider"
].map(id => document.getElementById(id));

const cityOutputs = [
  "energyValue",
  "treesValue",
  "transportValue"
].map(id => document.getElementById(id));

const cityScore = $("#cityScore");
const scoreProgress = $("#scoreProgress");
const cityMessage = $("#cityMessage");


function updateCity() {

  const values = cityInputs.map(input =>
    Number(input?.value ?? 50)
  );

  cityOutputs.forEach((output, index) => {

    if (output) {

      output.textContent = `${values[index]}%`;

    }

  });

  const score = Math.round(
    values.reduce((sum, value) => sum + value, 0) /
    values.length
  );

  if (cityScore) {

    cityScore.innerHTML =
      `${score}<span>/100</span>`;

  }

  if (scoreProgress) {

    scoreProgress.style.width = `${score}%`;

  }

  if (cityMessage) {

    if (score < 35) {

      cityMessage.textContent =
        "مدينتك محتاجة بداية جديدة: جرّب تزود الطاقة النظيفة والمساحات الخضراء.";

    } else if (score < 70) {

      cityMessage.textContent =
        "خطوة حلوة! فيه فرص كتير تخلي مدينتك أنضف وأسهل في الحركة.";

    } else {

      cityMessage.textContent =
        "مدينتك ماشية في اتجاه مستدام. حافظ على التوازن وطوّر اختياراتك!";

    }

  }

}


// Listen to sliders

cityInputs.forEach(input => {

  input?.addEventListener(
    "input",
    updateCity
  );

});


// Reset city

$("#resetCity")?.addEventListener("click", () => {

  cityInputs.forEach(input => {

    if (input) {

      input.value = 50;

    }

  });

  updateCity();

});

updateCity();


// ==========================================
// CLIMATE QUIZ
// ==========================================

const questions = [

  {
    question:
      "ما السبب الرئيسي في الزيادة الحالية للاحتباس الحراري؟",

    options: [
      "زيادة انبعاثات غازات الدفيئة بسبب أنشطة الإنسان",
      "اقتراب الأرض من الشمس",
      "ثقب الأوزون وحده",
      "زيادة عدد السحب"
    ],

    answer: 0,

    explanation:
      "صحيح! حرق الوقود الأحفوري وتغيّر استخدام الأراضي وغيرهما يرفع تركيز غازات الدفيئة."
  },

  {
    question:
      "أي غاز من دول بيُعتبر من غازات الدفيئة؟",

    options: [
      "الأكسجين",
      "النيتروجين",
      "ثاني أكسيد الكربون",
      "الأرجون"
    ],

    answer: 2,

    explanation:
      "ثاني أكسيد الكربون من أهم غازات الدفيئة المرتبطة بالأنشطة البشرية."
  },

  {
    question:
      "هل تأثير الاحتباس الحراري الطبيعي مهم للحياة؟",

    options: [
      "لا، لازم يختفي تمامًا",
      "أيوه، بيساعد الأرض تحتفظ بحرارة مناسبة",
      "بيمنع ضوء الشمس",
      "مالوش أي تأثير"
    ],

    answer: 1,

    explanation:
      "بالضبط. التأثير الطبيعي ضروري، لكن زيادته بسبب الأنشطة البشرية هي المشكلة."
  },

  {
    question:
      "طبقة الأوزون والاحتباس الحراري هما نفس المشكلة؟",

    options: [
      "أيوه تمامًا",
      "لا، مشكلتان مختلفتان",
      "الأوزون هو السبب الوحيد",
      "مفيش علاقة بالغلاف الجوي"
    ],

    answer: 1,

    explanation:
      "صحيح. استنزاف الأوزون والاحترار العالمي مشكلتان مختلفتان، حتى لو فيه روابط بين بعض المواد والعمليات."
  },

  {
    question:
      "أي اختيار ممكن يساعد في تقليل الانبعاثات؟",

    options: [
      "زيادة حرق الفحم",
      "إهدار الكهرباء",
      "الاعتماد على النقل المستدام والطاقة النظيفة",
      "إزالة المساحات الخضراء"
    ],

    answer: 2,

    explanation:
      "ممتاز! الطاقة النظيفة والنقل المستدام وكفاءة الطاقة من مسارات تقليل الانبعاثات."
  }

];


// Quiz variables

let questionIndex = 0;

let score = 0;

let answered = false;


// Quiz elements

const quizContainer = $("#quizContainer");

const quizResult = $("#quizResult");

const quizQuestion = $("#quizQuestion");

const quizOptions = $("#quizOptions");

const quizFeedback = $("#quizFeedback");

const nextQuestion = $("#nextQuestion");

const quizQuestionNumber = $("#quizQuestionNumber");

const quizProgress = $("#quizProgress");


// ==========================================
// RENDER QUESTION
// ==========================================

function renderQuestion() {

  const current = questions[questionIndex];

  answered = false;

  quizQuestion.textContent =
    current.question;

  quizQuestionNumber.textContent =
    `السؤال ${questionIndex + 1} من ${questions.length}`;

  quizProgress.style.width =
    `${((questionIndex + 1) / questions.length) * 100}%`;

  quizFeedback.textContent = "";

  nextQuestion.disabled = true;

  nextQuestion.innerHTML =
    questionIndex === questions.length - 1
      ? "اعرف نتيجتك ←"
      : "السؤال التالي ←";

  quizOptions.innerHTML = "";


  current.options.forEach((option, index) => {

    const button = document.createElement("button");

    button.type = "button";

    button.className = "quiz-option";

    button.textContent = option;

    button.addEventListener("click", () => {

      chooseAnswer(index, button);

    });

    quizOptions.appendChild(button);

  });

}


// ==========================================
// CHOOSE ANSWER
// ==========================================

function chooseAnswer(selectedIndex, selectedButton) {

  if (answered) return;

  answered = true;

  const current = questions[questionIndex];

  const optionButtons =
    $$(".quiz-option", quizOptions);


  optionButtons.forEach((button, index) => {

    button.disabled = true;

    if (index === current.answer) {

      button.classList.add("correct");

    }

  });


  if (selectedIndex === current.answer) {

    score++;

    quizFeedback.textContent =
      current.explanation;

  } else {

    selectedButton.classList.add("wrong");

    quizFeedback.textContent =
      `مش دي الإجابة. ${current.explanation}`;

  }


  nextQuestion.disabled = false;

}


// ==========================================
// NEXT QUESTION
// ==========================================

nextQuestion?.addEventListener("click", () => {

  if (!answered) return;

  questionIndex++;

  if (questionIndex < questions.length) {

    renderQuestion();

  } else {

    quizContainer.hidden = true;

    quizResult.hidden = false;

    $("#finalScore").textContent =
      `${score}/${questions.length}`;


    if (score === 5) {

      $("#resultMessage").textContent =
        "ممتاز! واضح إنك فهمت الحكاية كويس.";

    } else if (score >= 3) {

      $("#resultMessage").textContent =
        "شغل حلو! راجع الأجزاء اللي فاتتك وجرّب تاني.";

    } else {

      $("#resultMessage").textContent =
        "دي بداية الرحلة. ارجع للحكاية وجرب الاختبار مرة تانية.";

    }

  }

});


// ==========================================
// RESTART QUIZ
// ==========================================

$("#restartQuiz")?.addEventListener("click", () => {

  questionIndex = 0;

  score = 0;

  quizResult.hidden = true;

  quizContainer.hidden = false;

  renderQuestion();

});


// Initial question

renderQuestion();


// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log(
  "7EKAYET ARD 🌍 | A STORY YOU CAN CHANGE"
);
