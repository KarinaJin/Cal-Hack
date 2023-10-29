import React from 'react'
import InputComponent from '../../components/InputComponent/InputComponent';

const ProblemComponent = ({selectedProblem}) => {

  return (
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
        <InputComponent selectedProblem={selectedProblem}/>
      </div>
  )
}

export default ProblemComponent;
