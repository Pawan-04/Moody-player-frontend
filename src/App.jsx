import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import './App.css'
import FaceExpression from './components/FaceExpression'
import SongCaed from './components/SongCaed'

function App() {
  
    const [songs,setSongs] = useState([])

  return (
    <>
      <FaceExpression setSongs={setSongs}></FaceExpression>
      <SongCaed songs={songs}></SongCaed>
    </>
  )
}

export default App
