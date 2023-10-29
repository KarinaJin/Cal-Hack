import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProblemContext } from '../../contexts/ProblemContext';
import ProblemComponent from '../../components/ProblemComponent/ProblemComponent';

const ProblemPage = () => {

  const { problems } = useProblemContext();

  const { id } = useParams();

  const selectedProblem = problems.find((problem) => problem.id === id);

  let lastId = undefined;
  let nextId = undefined;

  if(id != undefined) {
    let lastIdNum = parseInt(id, 10) - 1;
    if(lastIdNum > 0) {
      lastId = String(lastIdNum);
    }
    let nextIdNum = parseInt(id, 10) + 1;
    if(nextIdNum <= problems.length) {
      nextId = String(nextIdNum);
    }
  }
  
  return (
    <div className='flex w-full flex-col p-5 h-screen'>
      <div className='w-full flex flex-row justify-between'>
        <Link to={`/problem/${lastId}`} className={`${lastId == undefined && 'invisible'} inline-flex items-center justify-center py-3 px-5 text-base font-medium text-blue-600 rounded-lg bg-gray-50 hover:text-blue-800 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}>
            <span className="w-full">Last</span>
        </Link> 
        <Link to={`/problem/${nextId}`} className={`${nextId == undefined && 'invisible'} inline-flex items-center justify-center py-3 px-5 text-base font-medium text-blue-600 rounded-lg bg-gray-50 hover:text-blue-800 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}>                   
            <span className="w-full">Next</span>
        </Link> 
      </div>
      <div className='overflow-y-auto'>
        <ProblemComponent selectedProblem={selectedProblem}/>
      </div>
    </div>
  )
}

export default ProblemPage;
