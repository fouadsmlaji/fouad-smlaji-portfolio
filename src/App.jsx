import { Routes, Route } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import Header from './Components/Header'
import HomePage from './Pages/HomePage'
import ProjectDetails from './Pages/ProjectDetails'
import './App.css'

function App() {
  return (
    <ParallaxProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </ParallaxProvider>
  )
}

export default App
