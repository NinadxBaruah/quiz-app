import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon, EyeIcon } from '@heroicons/react/24/outline';

export default function QuizSummary({ results, quiz, onRetry }) {
  const [showAnswers, setShowAnswers] = useState(false);
  const correctAnswers = results.filter(r => r.isCorrect).length;
  const score = (correctAnswers * parseFloat(quiz.correct_answer_marks)) -
                ((results.length - correctAnswers) * parseFloat(quiz.negative_marks));
  const percentage = (score / (quiz.questions_count * parseFloat(quiz.correct_answer_marks))) * 100;
  
  const getFeedback = () => {
    if (percentage >= 90) return { message: "Outstanding!", emoji: "🏆" };
    if (percentage >= 70) return { message: "Great job!", emoji: "🌟" };
    if (percentage >= 50) return { message: "Good effort!", emoji: "👍" };
    return { message: "Keep practicing!", emoji: "💪" };
  };

  const feedback = getFeedback();

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 flex items-center">
      <div className="max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-indigo-50 max-h-[calc(100vh-2rem)] overflow-y-auto"
        >
          {!showAnswers ? (
            <>
              <div className="text-center mb-6">
                <span className="text-5xl mb-3 block">{feedback.emoji}</span>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{feedback.message}</h2>
                <p className="text-indigo-600">Quiz Complete</p>
              </div>

              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 text-white text-center mb-6">
                <p className="text-4xl font-bold mb-1">{score.toFixed(1)}</p>
                <p className="text-sm opacity-90">Total Score</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <CheckCircleIcon className="h-6 w-6 mx-auto mb-1 text-green-600" />
                  <p className="text-xl font-bold text-green-600 mb-1">{correctAnswers}</p>
                  <p className="text-xs text-gray-600">Correct Answers</p>
                </div>
                <div className="bg-red-50 rounded-xl p-3 text-center">
                  <XCircleIcon className="h-6 w-6 mx-auto mb-1 text-red-600" />
                  <p className="text-xl font-bold text-red-600 mb-1">
                    {results.length - correctAnswers}
                  </p>
                  <p className="text-xs text-gray-600">Incorrect Answers</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowAnswers(true)}
                  className="w-full cursor-pointer bg-white text-indigo-600 py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition duration-200 border-2 border-indigo-600 flex items-center justify-center gap-2"
                >
                  <EyeIcon className="h-5 w-5" />
                  Review Answers
                </button>

                <button
                  onClick={onRetry}
                  className="w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center gap-2"
                >
                  <ArrowPathIcon className="h-5 w-5" />
                  Try Again
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Answer Review</h2>
                <button
                  onClick={() => setShowAnswers(false)}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  Back to Summary
                </button>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {quiz.questions.map((question, index) => {
                  const userAnswer = results[index];
                  const selectedOption = question.options.find(opt => opt.id === userAnswer?.selectedAnswerId);
                  const correctOption = question.options.find(opt => opt.is_correct);

                  return (
                    <div key={question.id} className="border-b border-gray-200 pb-4 last:border-0">
                      <p className="font-medium text-gray-800 mb-2">
                        {index + 1}. {question.description}
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-start gap-2">
                          <span className="font-medium text-gray-600">Your Answer:</span>
                          <span className={userAnswer?.isCorrect ? 'text-green-600' : 'text-red-600'}>
                            {selectedOption?.description || 'Not answered'}
                          </span>
                        </div>
                        {!userAnswer?.isCorrect && (
                          <div className="flex items-start gap-2">
                            <span className="font-medium text-gray-600">Correct Answer:</span>
                            <span className="text-green-600">{correctOption?.description}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={onRetry}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center gap-2"
              >
                <ArrowPathIcon className="h-5 w-5" />
                Try Again
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}