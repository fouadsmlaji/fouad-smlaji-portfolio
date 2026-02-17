import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import HomePage from './Pages/HomePage'
import ProjectDetails from './Pages/ProjectDetails'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </>
  )
}

export default App
