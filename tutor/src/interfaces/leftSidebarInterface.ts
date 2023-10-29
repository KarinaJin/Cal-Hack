import { Problem } from "./problemInterface";

export interface LeftSidebarProps {
    problems: Problem[];
    onProblemSelect: (problem: Problem) => void;
}