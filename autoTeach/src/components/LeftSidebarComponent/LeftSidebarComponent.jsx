import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.jpeg'

const LeftSidebar = ({problems}) => {

  return (
    <div className=''>
      <aside id="default-sidebar" className="w-80 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <Link to={`/`} >
                <img src={logo} className='w-48 ml-3'/>
            </Link>
            <ul className="space-y-2 font-medium mt-8">
                {problems.map((problem) => (
                <li key={problem.id}>
                    <Link to={`/problem/${problem.id}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                        </svg>
                        <span className="ml-6">
                            {problem.name}
                        </span>
                    </Link>
                </li>
                ))}
            </ul>
            <div className='fixed bottom-5 w-full flex justify-center items-center'>
              <Link to='/create-problem' type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Create a problem
              </Link>
            </div>
        </div>
      </aside>
    </div>
  )
}

export default LeftSidebar;
