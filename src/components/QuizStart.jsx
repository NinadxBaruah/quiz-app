// src/components/QuizStart.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function QuizStart({ quiz, onStart }) {
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-indigo-50"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{quiz.title}</h1>
            <p className="text-indigo-600 font-medium">{quiz.topic}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <ClockIcon className="h-6 w-6 mx-auto mb-1 text-blue-600" />
              <p className="text-xs text-gray-600">Duration</p>
              <p className="text-base font-bold text-gray-800">{quiz.duration} min</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-3 text-center">
              <AcademicCapIcon className="h-6 w-6 mx-auto mb-1 text-purple-600" />
              <p className="text-xs text-gray-600">Questions</p>
              <p className="text-base font-bold text-gray-800">{quiz.questions_count}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <TrophyIcon className="h-6 w-6 mx-auto mb-1 text-green-600" />
              <p className="text-xs text-gray-600">Max Score</p>
              <p className="text-base font-bold text-gray-800">
                {quiz.questions_count * parseFloat(quiz.correct_answer_marks)}
              </p>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl p-4 mb-6">
            <h2 className="font-semibold text-gray-800 mb-2">Scoring System</h2>
            <div className="space-y-1 text-sm text-gray-600">
              <p>✅ Correct Answer: +{quiz.correct_answer_marks} points</p>
              <p>❌ Wrong Answer: -{quiz.negative_marks} points</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition duration-200"
          >
            Start Quiz
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}