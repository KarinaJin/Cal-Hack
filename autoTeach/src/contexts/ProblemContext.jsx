import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from "convex/react";
import { api } from '../../convex/_generated/api';

const ProblemContext = createContext({
  problems: [],
  addProblem: () => {}
});

export const useProblemContext = () => useContext(ProblemContext);

export const ProblemProvider = ({ children }) => {

  const createProblem = useMutation(api.problems.createProblem);
  const allProblems = useQuery(api.problems.getProblems);

  const [problems, setProblems] = useState([]);

  useEffect(() => {
    if(allProblems) {
      setProblems(allProblems)
    }
  }, [allProblems])

  const addProblem = (problem) => {
    createProblem(problem);
  };

  return (
    <ProblemContext.Provider value={{ problems, addProblem }}>
      {children}
    </ProblemContext.Provider>
  );

};