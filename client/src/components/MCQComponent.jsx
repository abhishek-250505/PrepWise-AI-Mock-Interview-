import React, { useState, useEffect } from 'react';

const MCQComponent = ({ question, options, onAnswer, timeLimit = 30 }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  const handleSubmit = () => {
    onAnswer(selectedOption);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <div className='bg-white glassmorphism rounded-xl p-6 shadow-soft'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold'>Question</h2>
          <div className='text-lg font-mono'>
            Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>

        <p className='text-lg mb-6'>{question}</p>

        <div className='space-y-3'>
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                selectedOption === index
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              <span className='font-medium mr-2'>{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={selectedOption === null}
          className='w-full mt-6 py-3 bg-gradient-primary text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-soft transition-all'
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default MCQComponent;