export interface Problem {
    id: string;
    statement: string;
    answer: string;
}

export interface ProblemComponentProps {
    problems: Problem[];
}

export interface ProblemContextProps {
    problems: Problem[];
    addProblem: (problem: Problem) => void;
}