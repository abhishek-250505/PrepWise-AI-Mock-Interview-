import { askAi } from "../services/openRouter.service.js";

const parseJsonResponse = (content) => {
  const cleaned = content
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

const getCorrectIndex = (correct, options) => {
  if (Number.isInteger(correct) && correct >= 0 && correct <= 3) return correct;
  if (Number.isInteger(correct) && correct >= 1 && correct <= 4) return correct - 1;

  if (typeof correct !== "string") return null;

  const normalized = correct.trim().toLowerCase();
  const letterIndex = ["a", "b", "c", "d"].indexOf(normalized.replace(/[^a-d]/g, ""));
  if (letterIndex >= 0) return letterIndex;

  const optionIndex = options.findIndex((option) => (
    String(option).trim().toLowerCase() === normalized
  ));

  return optionIndex >= 0 ? optionIndex : null;
};

const normalizeQuestions = (parsed) => {
  const rawQuestions = Array.isArray(parsed)
    ? parsed
    : Array.isArray(parsed?.questions)
      ? parsed.questions
      : [];

  const seen = new Set();

  return rawQuestions
    .map((item) => {
      const question = String(item?.question || "").trim();
      const options = Array.isArray(item?.options)
        ? item.options.map((option) => String(option).trim()).filter(Boolean)
        : [];
      const correct = getCorrectIndex(item?.correct ?? item?.answer ?? item?.correctAnswer, options);

      return {
        question,
        options,
        correct,
        explanation: String(item?.explanation || "").trim(),
      };
    })
    .filter((item) => {
      const key = item.question.toLowerCase();
      const isValid = item.question
        && item.options.length === 4
        && Number.isInteger(item.correct)
        && item.correct >= 0
        && item.correct <= 3
        && !seen.has(key);

      if (isValid) seen.add(key);
      return isValid;
    })
    .slice(0, 20);
};

const createBackupQuestions = (count, existingQuestions = []) => {
  const seen = new Set(existingQuestions.map((item) => item.question.toLowerCase()));
  const numberSeed = Date.now() % 37;
  const templates = [
    (i) => {
      const base = 120 + (i * 10) + numberSeed;
      const percent = [10, 12, 15, 20][i % 4];
      const answer = (base * percent) / 100;
      return {
        question: `What is ${percent}% of ${base}?`,
        options: [answer - 5, answer, answer + 5, answer + 10].map(String),
        correct: 1,
        explanation: `${percent}% of ${base} is ${base} x ${percent / 100} = ${answer}.`,
      };
    },
    (i) => {
      const speed = 40 + (i * 5);
      const time = 2 + (i % 4);
      const distance = speed * time;
      return {
        question: `A vehicle travels at ${speed} km/h for ${time} hours. What distance does it cover?`,
        options: [`${distance - 20} km`, `${distance} km`, `${distance + 20} km`, `${distance + 40} km`],
        correct: 1,
        explanation: `Distance = speed x time = ${speed} x ${time} = ${distance} km.`,
      };
    },
    (i) => {
      const first = 3 + i;
      const second = first * 2;
      const third = second * 2;
      const fourth = third * 2;
      const answer = fourth * 2;
      return {
        question: `Find the next number in the series: ${first}, ${second}, ${third}, ${fourth}, ?`,
        options: [answer - 4, answer, answer + 4, answer + 8].map(String),
        correct: 1,
        explanation: `Each number is doubled, so the next number is ${answer}.`,
      };
    },
    (i) => {
      const workers = 4 + (i % 5);
      const days = 6 + (i % 4);
      const newWorkers = workers * 2;
      const newDays = days / 2;
      return {
        question: `${workers} workers finish a task in ${days} days. How many days will ${newWorkers} workers take?`,
        options: [`${newDays}`, `${newDays + 1}`, `${days}`, `${days + 2}`],
        correct: 0,
        explanation: `Doubling workers halves the time, so ${newWorkers} workers take ${newDays} days.`,
      };
    },
  ];

  const questions = [];
  let index = 0;

  while (questions.length < count) {
    const question = templates[index % templates.length](index + 1);
    const key = question.question.toLowerCase();

    if (!seen.has(key)) {
      seen.add(key);
      questions.push(question);
    }

    index += 1;
  }

  return questions;
};

export const generateAptitudeQuestions = async (req, res) => {
  try {
    const recentQuestions = Array.isArray(req.body?.recentQuestions)
      ? req.body.recentQuestions.slice(0, 60)
      : [];

    const sessionSeed = req.body?.sessionSeed || `${Date.now()}-${Math.random()}`;

    const createMessages = (attempt) => [
      {
        role: "system",
        content: `
You are an aptitude test generator for job interview preparation.

Return ONLY valid JSON. No markdown. No explanations.

Generate exactly 25 unique multiple-choice aptitude questions.

Required JSON format:
{
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correct": 0,
      "explanation": "short explanation"
    }
  ]
}

Rules:
- Include a balanced mix of percentages, ratios, averages, profit/loss, time and work, speed/distance, number series, logical reasoning, syllogism, coding-decoding, probability, and basic data interpretation.
- Do not repeat any question inside the same test.
- Do not copy or closely paraphrase the recent questions provided by the user.
- The correct field must be the zero-based index of the correct option.
- Each question must have exactly 4 options.
- Keep questions clear and suitable for fresher to intermediate interviews.
`
      },
      {
        role: "user",
        content: JSON.stringify({
          questionCount: 25,
          sessionSeed,
          attempt,
          avoidRecentQuestions: recentQuestions,
        }),
      },
    ];

    let validQuestions = [];

    for (let attempt = 1; attempt <= 2; attempt += 1) {
      const aiResponse = await askAi(createMessages(attempt));
      const parsed = parseJsonResponse(aiResponse);
      validQuestions = normalizeQuestions(parsed);

      if (validQuestions.length === 20) break;
    }

    if (validQuestions.length < 20) {
      validQuestions = [
        ...validQuestions,
        ...createBackupQuestions(20 - validQuestions.length, validQuestions),
      ];
    }

    return res.json({
      sessionSeed,
      questions: validQuestions.slice(0, 20).map((item) => ({
        question: item.question,
        options: item.options,
        correct: item.correct,
        explanation: item.explanation || "",
      })),
    });
  } catch (error) {
    return res.status(500).json({ message: `Failed to generate aptitude questions: ${error.message}` });
  }
};
