import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { fetchQuizData } from './api/quizApi';
import QuizStart from './components/QuizStart';
import Question from './components/Question';
import QuizSummary from './components/QuizSummary';

const queryClient = new QueryClient();

function QuizApp() {
  const [gameState, setGameState] = useState('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [results, setResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  const { data: quiz, isLoading, error } = useQuery({
    queryKey: ['quiz'],
    queryFn: fetchQuizData
  });

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleAnswerSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startQuiz = () => {
    setGameState('playing');
    setTimeLeft(quiz.duration * 60);
    setCurrentQuestionIndex(0);
    setResults([]);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer) {
      setResults(prev => [...prev, {
        questionId: quiz.questions[currentQuestionIndex].id,
        selectedAnswerId: selectedAnswer.id,
        isCorrect: selectedAnswer.is_correct
      }]);
    }

    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setGameState('complete');
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        Error loading quiz data
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {gameState === 'start' && (
        <QuizStart quiz={quiz} onStart={startQuiz} />
      )}
      
      {gameState === 'playing' && (
        <div className="h-full flex flex-col">
          <Question
            question={quiz.questions[currentQuestionIndex]}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
            timeLeft={timeLeft}
          />
          <div className="max-w-3xl mx-auto px-6 pb-4 w-full">
            <button
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
              className="w-full cursor-pointer bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-200 disabled:bg-gray-400"
            >
              {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      )}
      
      {gameState === 'complete' && (
        <QuizSummary
          results={results}
          quiz={quiz}
          onRetry={startQuiz}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuizApp />
    </QueryClientProvider>
  );
}