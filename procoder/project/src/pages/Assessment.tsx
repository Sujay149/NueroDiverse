import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, CheckCircle } from 'lucide-react';

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [category, setCategory] = useState(null);

  const questions = [
    {
      id: 1,
      question: "How often do you find it difficult to concentrate on tasks?",
      options: ["Never", "Sometimes", "Often", "Very Often"],
    },
    {
      id: 2,
      question: "Do you prefer visual learning over text-based learning?",
      options: ["Strongly Prefer Visual", "Somewhat Prefer Visual", "No Preference", "Prefer Text-based"],
    },
    {
      id: 3,
      question: "How do you feel about social interactions?",
      options: ["Very Comfortable", "Somewhat Comfortable", "Somewhat Uncomfortable", "Very Uncomfortable"],
    },
  ];

  const determineCategory = (responses) => {
    if (responses[0] === "Very Often" && responses[2] === "Very Uncomfortable") {
      return "ADHD or Autism Spectrum";
    }
    if (responses[1] === "Strongly Prefer Visual") {
      return "Dyslexia or Visual Learning Preference";
    }
    return "General Neurodiversity";
  };

  const handleAnswer = (answer) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: answer }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const category = determineCategory(answers);
      setCategory(category);
      setShowResults(true);
    }
  };

  const restartAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setCategory(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Neurodiversity Assessment</h1>
        <p className="text-gray-600">Help us understand your needs better</p>
      </div>

      {!showResults ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Question {currentQuestion + 1}</h2>
              <span className="text-sm text-gray-500">
                {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <p className="text-lg text-gray-700 mb-6">{questions[currentQuestion].question}</p>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 text-left rounded-lg border transition-colors
                    ${answers[currentQuestion] === option ? 'bg-gray-100 border-gray-400' : 'border-gray-200 hover:bg-gray-50'}
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Assessment Results</h2>
          <p className="text-lg text-gray-700 mb-4">Based on your responses, you may fall under:</p>
          <p className="text-2xl font-bold text-gray-800">{category}</p>
          <button
            onClick={restartAssessment}
            className="mt-6 py-3 px-6 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Retake Assessment
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Assessment;