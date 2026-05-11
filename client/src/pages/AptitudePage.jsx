import React, { useEffect, useState } from 'react';
import MCQComponent from '../components/MCQComponent';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/ToastProvider';
import { useSelector } from 'react-redux';

const RECENT_APTITUDE_KEY = 'prepwise-recent-aptitude-questions';

const getRecentQuestions = () => {
  try {
    return JSON.parse(localStorage.getItem(RECENT_APTITUDE_KEY)) || [];
  } catch {
    return [];
  }
};

const saveRecentQuestions = (newQuestions) => {
  const recentQuestions = getRecentQuestions();
  const merged = [...newQuestions, ...recentQuestions];
  const unique = Array.from(new Set(merged)).slice(0, 80);
  localStorage.setItem(RECENT_APTITUDE_KEY, JSON.stringify(unique));
};

const AptitudePage = () => {
  const navigate = useNavigate();
  const { confirmToast } = useToast();
  const { userData } = useSelector((state) => state.user);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLeaving, setIsLeaving] = useState(false);

  const loadQuestions = async () => {
    if (!userData) {
      setLoading(false);
      navigate('/auth');
      return;
    }

    setLoading(true);
    setError('');
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setFinished(false);

    try {
      const result = await axios.post(`${ServerUrl}/api/aptitude/generate-questions`, {
        recentQuestions: getRecentQuestions(),
        sessionSeed: window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
      });

      const nextQuestions = result.data.questions || [];
      if (nextQuestions.length !== 20) {
        throw new Error('AI did not return 20 questions.');
      }

      setQuestions(nextQuestions);
      saveRecentQuestions(nextQuestions.map((item) => item.question));
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Unable to generate aptitude questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userData) {
      setLoading(false);
      navigate('/auth');
      return;
    }

    loadQuestions();
  }, [userData]);

  const handleAnswer = (selected) => {
    if (isLeaving) return;
    if (!questions[currentQuestion]) return;

    const isCorrect = selected === questions[currentQuestion].correct;
    setAnswers([...answers, { question: currentQuestion, selected, correct: isCorrect }]);
    if (isCorrect) setScore(score + 1);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
    }
  };

  const handleLeaveTest = async () => {
    const shouldLeave = await confirmToast('Leave this aptitude test? Your current attempt will stop now.', {
      confirmText: 'Leave Test',
      cancelText: 'Stay',
    });
    if (!shouldLeave) return;

    setIsLeaving(true);
    setQuestions([]);
    navigate('/');
  };

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className='max-w-2xl mx-auto p-6'>
        <div className='bg-white glassmorphism rounded-xl p-8 shadow-soft text-center'>
          <h1 className='text-3xl font-bold mb-4'>Aptitude Test Complete</h1>
          <div className='text-6xl font-bold text-primary-500 mb-4'>{percentage}%</div>
          <p className='text-lg mb-6'>You scored {score} out of {questions.length}</p>
          <button
            onClick={loadQuestions}
            className='px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-soft transition-all'
          >
            Generate New Test
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='max-w-2xl mx-auto p-6'>
        <div className='bg-white glassmorphism rounded-xl p-8 shadow-soft text-center'>
          <h1 className='text-3xl font-bold mb-4'>Generating Aptitude Test</h1>
          <p className='text-gray-600'>AI is preparing 20 fresh questions for this attempt.</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className='max-w-2xl mx-auto p-6'>
        <div className='bg-white glassmorphism rounded-xl p-8 shadow-soft text-center'>
          <h1 className='text-3xl font-bold mb-4'>Login Required</h1>
          <p className='text-gray-600 mb-6'>Please login to access the aptitude test.</p>
          <button
            onClick={() => navigate('/auth')}
            className='px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-soft transition-all'
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-2xl mx-auto p-6'>
        <div className='bg-white glassmorphism rounded-xl p-8 shadow-soft text-center'>
          <h1 className='text-3xl font-bold mb-4'>Could not load test</h1>
          <p className='text-red-600 mb-6'>{error}</p>
          <button
            onClick={loadQuestions}
            className='px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-soft transition-all'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const activeQuestion = questions[currentQuestion];

  if (!activeQuestion) {
    return (
      <div className='max-w-2xl mx-auto p-6'>
        <div className='bg-white glassmorphism rounded-xl p-8 shadow-soft text-center'>
          <h1 className='text-3xl font-bold mb-4'>Preparing Test</h1>
          <p className='text-gray-600 mb-6'>Please wait while your aptitude questions are loaded.</p>
          <button
            onClick={loadQuestions}
            className='px-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-soft transition-all'
          >
            Load Questions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='mb-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between'>
        <div className='text-center sm:text-left'>
          <h1 className='text-3xl font-bold'>Aptitude Mock Test</h1>
          <p className='text-gray-600'>Question {currentQuestion + 1} of {questions.length}</p>
        </div>

        <button
          onClick={handleLeaveTest}
          disabled={isLeaving}
          className='rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {isLeaving ? 'Leaving...' : 'Leave Test'}
        </button>
      </div>
      <MCQComponent
        key={currentQuestion}
        question={activeQuestion.question}
        options={activeQuestion.options}
        onAnswer={handleAnswer}
        timeLimit={45}
      />
    </div>
  );
};

export default AptitudePage;
