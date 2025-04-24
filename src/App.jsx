import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SentenceConstructionLanding from "./pages/SentenceConstructionLanding"
import QuestionPage from "./pages/QuestionPage"
import ResultPage from "./pages/ResultPage"
import AppLayout from "./layouts/app-layout"
import questionsData from "../src/data/questions"






const router = createBrowserRouter([{
  element: <AppLayout />,

  children: [
    {
      path: "/",
      element: <SentenceConstructionLanding />
    },

    { 
      path: "/sentence-construction/question/:questionId",
      element: <QuestionPage />,
    },
    {
      path: "/result",
      element: <ResultPage />,
    }

  ]
}])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
