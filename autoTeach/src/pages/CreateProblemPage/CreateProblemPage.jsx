import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useProblemContext } from '../../contexts/ProblemContext';

const CreateProblemPage = () => {

  const { problems, addProblem } = useProblemContext();

  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [criteria, setCriteria] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleAddProblem = () => {
    if (name && title && criteria && correctAnswer) {
      const newProblem = {
        id: String(problems.length + 1),
        name,
        title,
        subtitle,
        criteria,
        correctAnswer,
      };
      console.log(newProblem);
      addProblem(newProblem);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className='flex flex-col p-16'>
      <span className='text-3xl'>Create a new problem</span>
      <div className='w-full py-10'>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Problem Name*</label>
          <input type="text" 
                 value={name} 
                 onChange={(e) => setName(e.target.value)}
                 className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Problem Title*</label>
          <textarea id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your problem title..." required></textarea>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Problem Subtitle</label>
          <textarea id="subtitle" 
                    value={subtitle} 
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your problem subtitle..."></textarea>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grading Criteria*</label>
          <textarea id="criteria" 
                    value={criteria} 
                    onChange={(e) => setCriteria(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your problem grading criteria..." required></textarea>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correct Answer*</label>
          <textarea id="message" 
                    value={correctAnswer} 
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your problem grading criteria..." required></textarea>
        </div>
        <button onClick={handleAddProblem}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create a new problem</button>
      </div>
    </div>
  )
}

export default CreateProblemPage
