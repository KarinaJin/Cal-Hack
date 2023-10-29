import React, { createContext, useContext, useState } from 'react';
import { Problem, ProblemContextProps } from '../interfaces/problemInterface';


const ProblemContext = createContext<ProblemContextProps>({
  problems: [],
  addProblem: () => {}
});

export const useProblemContext = () => useContext(ProblemContext);

export const ProblemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {


  const [problems, setProblems] = useState<Problem[]>(
    [
        { id: '1', statement: 'By using the formula d = rt and given that d = 210, t = 30. Solve r.', answer: ""},
        { id: '2', statement: 'By using the formula d = rt and given that d = 480, t = 120. Solve r.', answer: ""},
        { id: '3', statement: 'By using the formula d = rt and given that d = 1000, t = 100. Solve r.', answer: ""},
    ]
  );

  const addProblem = (problem: Problem) => {
    setProblems([...problems, problem]);
  };

  return (
    <ProblemContext.Provider value={{ problems, addProblem }}>
      {children}
    </ProblemContext.Provider>
  );

};