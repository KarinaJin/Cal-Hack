import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from './components/Layout';
import './App.css'
import HomePage from './pages/HomePage/HomePage';
import ProblemPage from './pages/ProblemPage/ProblemPage';
import CreateProblemPage from "./pages/CreateProblemPage/CreateProblemPage";

function App() {

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/problem/:id", element: <ProblemPage/> },
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
