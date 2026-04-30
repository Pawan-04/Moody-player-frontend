import { useState } from 'react'
import './App.css'
import FaceExpression from './components/FaceExpression'
import SongCaed from './components/SongCaed'
import Navbar from './components/Navbar'
import ProjectDetails from './components/ProjectDetails'

function App() {
  const [songs, setSongs] = useState([])

  return (
    <>
      <Navbar />
      <div className="app-container">
        <header id="detector" className="app-header">
          <h1>Moody<span className="accent-text">Player</span></h1>
          <p>AI-Powered Mood Based Music Recommendations</p>
        </header>

        <main className="app-content">
          <div className="left-panel">
            <FaceExpression setSongs={setSongs}></FaceExpression>
          </div>

          <div className="right-panel">
            <SongCaed songs={songs}></SongCaed>
          </div>
        </main>

        <ProjectDetails />

        <footer className="app-footer">
          <p>Need support or want the source code?</p>
          <a href="mailto:pawan4kp@gmail.com?subject=Moody Player Request" className="footer-link" id='footer-contact'>Contact Me</a>
        </footer>
      </div>
    </>
  )
}

export default App
