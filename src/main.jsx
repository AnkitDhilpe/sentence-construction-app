import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ScoreProvider } from "./context/ScoreContext";

createRoot(document.getElementById('root')).render(
  <ScoreProvider>
    <App />
  </ScoreProvider>
)
