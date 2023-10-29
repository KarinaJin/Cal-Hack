import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from './components/Layout';
import './App.css'
import HomePage from './pages/HomePage/HomePage';
import ProblemPage from './pages/ProblemPage/ProblemPage';
import { useProblemContext } from './contexts/ProblemContext';
import CreateProblemPage from "./pages/CreateProblemPage/CreateProblemPage";

function App() {

  const { problems } = useProblemContext();

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/problem/:id", element: <ProblemPage problems={problems}/> },
        { path: "/create-problem", element: <CreateProblemPage /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
