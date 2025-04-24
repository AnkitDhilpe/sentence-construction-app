import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import questionsData from "../data/questions.json";
import { useScore } from "../context/ScoreContext";

const QuestionPage = () => {
  const navigate = useNavigate();
  const { incrementScore } = useScore();

  const { questionId } = useParams();
  const questions = questionsData?.data?.questions || [];
  const questionData = questions.find(q => q.questionId.trim() === questionId?.trim());


  const [selectedWords, setSelectedWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  const totalBlanks = questionData?.correctAnswer?.length || 0;

  useEffect(() => {
    // Reset state on new question
    setSelectedWords([]);
    setTimeLeft(30);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          clearInterval(timer);
          handleNext(); // auto-advance when timer hits 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionId]); // key fix: watch questionId

  const handleSelect = (word) => {
    if (selectedWords.length < totalBlanks && !selectedWords.includes(word)) {
      setSelectedWords(prev => [...prev, word]);
    }
  };

  const handleNext = () => {
    const isCorrect =
      JSON.stringify(selectedWords) === JSON.stringify(questionData.correctAnswer);
    if (isCorrect) incrementScore();

    const index = questions.findIndex(q => q.questionId === questionId);
    const nextQuestion = questions[index + 1];

    if (nextQuestion) {
      navigate(`/sentence-construction/question/${nextQuestion.questionId}`);
    } else {
      navigate("/result");
    }
  };

  const handleQuit = () => {
    navigate("/result");
  };

  if (!questionData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Question not found. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-[90%] max-w-3xl border-2 border-yellow-400 rounded-xl p-6 shadow-md relative">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
          <button onClick={handleQuit} className="text-gray-600 hover:text-red-500">Quit</button>
        </div>

        <div className="flex space-x-2 mb-4">
          {Array.from({ length: totalBlanks }).map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full ${index < selectedWords.length ? "bg-orange-500" : "bg-gray-200"}`}
            />
          ))}
        </div>

        <h2 className="text-center text-gray-600 mb-6">Select the missing words in the correct order</h2>


        <p className="text-center text-lg mb-6">
          {
            (() => {
              let blankIndex = 0;
              const parts = questionData.question.split(/(_____________)/g);
              return parts.map((part, idx) => {
                if (part === "_____________") {
                  const word = selectedWords[blankIndex];
                  blankIndex++;
                  return (
                    <span key={idx}>
                      {word ? (
                        <span className="inline-block font-semibold mx-1 underline">{word}</span>
                      ) : (
                        <span className="inline-block w-20 mx-1 border-b border-gray-400">&nbsp;</span>
                      )}
                    </span>
                  );
                } else {
                  return <span key={idx}>{part}</span>;
                }
              });
            })()
          }
        </p>


        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {questionData.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 border rounded ${selectedWords.includes(option)
                ? "border-red-500 text-red-500"
                : "border-gray-300 hover:border-blue-500"
                }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={selectedWords.length < totalBlanks}
            className={`p-3 rounded-full transition ${selectedWords.length < totalBlanks
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            ➜
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
