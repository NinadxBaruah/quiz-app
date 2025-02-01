// src/components/Question.jsx
import React from 'react';
import { motion } from 'framer-motion';
import * as Progress from '@radix-ui/react-progress';

export default function Question({
  question,
  selectedAnswer,
  onSelectAnswer,
  currentQuestionIndex,
  totalQuestions,
  timeLeft
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 flex flex-col">
      <div className="max-w-3xl mx-auto w-full">
        <div className="h-16 mb-2">
          <div className="flex justify-between items-center mb-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-full px-4 py-2 shadow-sm">
              <span className="text-indigo-600 font-medium">
                Question {currentQuestionIndex + 1}/{totalQuestions}
              </span>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-full px-4 py-2 shadow-sm">
              <span className={`font-medium ${timeLeft < 30 ? 'text-red-600' : 'text-gray-600'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          
          <Progress.Root className="h-2 overflow-hidden bg-gray-200 rounded-full">
            <Progress.Indicator
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-transform duration-300"
              style={{ transform: `translateX(-${100 - ((currentQuestionIndex + 1) / totalQuestions * 100)}%)` }}
            />
          </Progress.Root>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-indigo-50 flex flex-col flex-grow"
        >
          <h2 className="text-xl font-medium text-gray-800 mb-4">
            {question.description}
          </h2>
          
          <div className="space-y-3 flex-grow">
            {question.options.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectAnswer(option)}
                className={`w-full cursor-pointer p-4 text-left rounded-xl border-2 transition duration-200 relative overflow-hidden group
                  ${selectedAnswer?.id === option.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-200'}
                `}
              >
                <span className="relative z-10">{option.description}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
