import React from 'react';
import questionsData from "../data/questions.json";
import { useNavigate } from 'react-router-dom';
import { useScore,  } from "../context/ScoreContext";

const ResultPage = () => {
  const { score, resetScore } = useScore();
  const navigate = useNavigate();
  const questions = questionsData.data.questions;

  const handlePlayAgain = () => {
    navigate("/"); // back to landing
    resetScore();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <div className="p-6 text-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">🎉 Quiz Complete!</h1>
        <p className="text-lg mb-6">
          You scored <span className="font-semibold">{score}</span> out of{" "}
          <span className="font-semibold">{questions.length}</span>
        </p>

        <button
          onClick={handlePlayAgain}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
