import React from 'react';
import { Link, useParams } from 'react-router-dom';
import InputComponent from '../../components/InputComponent/InputComponent';

const ProblemPage = (props) => {

  const { problems } = props;
  
  const { id } = useParams();

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

  const selectedProblem = problems.find((problem) => problem.id === id);
  
  return (
    <div className='flex w-full flex-col p-5'>
      <div className='w-full flex flex-row justify-between'>
        <Link to={`/problem/${lastId}`} className={`${lastId == undefined && 'invisible'} inline-flex items-center justify-center py-3 px-5 text-base font-medium text-blue-600 rounded-lg bg-gray-50 hover:text-blue-800 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}>
            <span className="w-full">Last</span>
        </Link> 
        <Link to={`/problem/${nextId}`} className={`${nextId == undefined && 'invisible'} inline-flex items-center justify-center py-3 px-5 text-base font-medium text-blue-600 rounded-lg bg-gray-50 hover:text-blue-800 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}>                   
            <span className="w-full">Next</span>
        </Link> 
      </div>
      <div className='w-full flex flex-col px-5 py-10'>
        <span className='text-gray-500'>
          Problem Statement
        </span>
        <div className='text-2xl mt-3'>
            {selectedProblem?.title}
        </div>
        {selectedProblem?.subtitle && 
          <div className='text-lg mt-3'>
            {selectedProblem?.subtitle}
          </div>
        }
        <InputComponent />
      </div>
    </div>
  )
}

export default ProblemPage;
