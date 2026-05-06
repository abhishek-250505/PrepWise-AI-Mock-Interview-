export const hrBehavioralQuestions = {
  hr: [
    {
      question: "Can you walk me through your career journey and explain the decisions that brought you to this role?",
      difficulty: "easy",
      timeLimit: 75,
      category: "career-story",
    },
    {
      question: "What part of this role genuinely interests you, and what makes you believe you would perform well here?",
      difficulty: "easy",
      timeLimit: 75,
      category: "motivation",
    },
    {
      question: "Tell me about a weakness you are actively working on, and what measurable progress you have made recently.",
      difficulty: "medium",
      timeLimit: 90,
      category: "self-awareness",
    },
    {
      question: "Describe a time when feedback from someone changed the way you worked or communicated with others.",
      difficulty: "medium",
      timeLimit: 90,
      category: "feedback",
    },
    {
      question: "If you joined our team and your first month felt unclear or unstructured, how would you handle it?",
      difficulty: "medium",
      timeLimit: 90,
      category: "ambiguity",
    },
    {
      question: "What kind of manager helps you do your best work, and what kind of management style challenges you?",
      difficulty: "medium",
      timeLimit: 90,
      category: "management-style",
    },
    {
      question: "Tell me about a time you disagreed with a manager or senior person. How did you express your view?",
      difficulty: "hard",
      timeLimit: 120,
      category: "disagreement",
    },
    {
      question: "Imagine you are doing good work but not getting recognition. How would you handle that situation professionally?",
      difficulty: "hard",
      timeLimit: 120,
      category: "recognition",
    },
    {
      question: "What would make you leave a role within the first six months, even if the salary was good?",
      difficulty: "hard",
      timeLimit: 120,
      category: "retention",
    },
    {
      question: "Why should we choose you over another candidate with similar technical skills and experience?",
      difficulty: "hard",
      timeLimit: 120,
      category: "differentiation",
    },
    {
      question: "Tell me about a time your personal values influenced a professional decision you made.",
      difficulty: "hard",
      timeLimit: 120,
      category: "values",
    },
    {
      question: "What questions would you ask before accepting this role, and what would those answers tell you?",
      difficulty: "medium",
      timeLimit: 90,
      category: "closing",
    },
  ],
  behavioral: [
    {
      question: "Tell me about a project where things went seriously wrong. What did you do first, and why?",
      difficulty: "medium",
      timeLimit: 90,
      category: "crisis",
    },
    {
      question: "Describe a situation where you had a conflict with a team member and still had to deliver work together.",
      difficulty: "hard",
      timeLimit: 120,
      category: "conflict",
    },
    {
      question: "Give me an example of a time when you had to influence someone without having authority over them.",
      difficulty: "hard",
      timeLimit: 120,
      category: "influence",
    },
    {
      question: "Tell me about a time you missed a deadline or almost missed one. What changed after that?",
      difficulty: "medium",
      timeLimit: 90,
      category: "accountability",
    },
    {
      question: "Describe a decision you made with incomplete information. How did you reduce the risk?",
      difficulty: "hard",
      timeLimit: 120,
      category: "judgment",
    },
    {
      question: "Tell me about a time you received tough criticism. How did you respond in the moment and afterward?",
      difficulty: "medium",
      timeLimit: 90,
      category: "feedback",
    },
    {
      question: "Give me an example of when you had to adapt quickly because a plan changed at the last minute.",
      difficulty: "medium",
      timeLimit: 90,
      category: "adaptability",
    },
    {
      question: "Tell me about a time you noticed a problem before others did. What action did you take?",
      difficulty: "medium",
      timeLimit: 90,
      category: "initiative",
    },
    {
      question: "Describe a time when you had to balance quality with speed. What tradeoff did you make?",
      difficulty: "hard",
      timeLimit: 120,
      category: "prioritization",
    },
    {
      question: "Tell me about a time you had to work with a difficult stakeholder, client, or teammate.",
      difficulty: "hard",
      timeLimit: 120,
      category: "stakeholder-management",
    },
    {
      question: "Give me an example of a time you took ownership of something that was not formally assigned to you.",
      difficulty: "medium",
      timeLimit: 90,
      category: "ownership",
    },
    {
      question: "Tell me about a time your first solution did not work. How did you diagnose and recover?",
      difficulty: "hard",
      timeLimit: 120,
      category: "problem-solving",
    },
  ],
};

export const getRandomQuestions = (mode, count = 5) => {
  const normalizedMode = mode?.toLowerCase();
  const questionList = normalizedMode === "hr"
    ? hrBehavioralQuestions.hr
    : hrBehavioralQuestions.behavioral;

  const groupedByDifficulty = ["easy", "medium", "hard"].flatMap((difficulty) => {
    return questionList
      .filter((item) => item.difficulty === difficulty)
      .sort(() => Math.random() - 0.5);
  });

  return groupedByDifficulty.slice(0, count);
};
