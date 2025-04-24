import { createContext, useContext, useState } from "react";

const ScoreContext = createContext();

export const useScore = () => useContext(ScoreContext);

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);

  const incrementScore = () => setScore(prev => prev + 1);
  const resetScore = () => setScore(0);

  return (
    <ScoreContext.Provider value={{ score, incrementScore, resetScore }}>
      {children}
    </ScoreContext.Provider>
  );
};