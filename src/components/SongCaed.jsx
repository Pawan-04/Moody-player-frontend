import React from 'react'
import { useState } from 'react'
import "./SongCard.css"

const SongCaed = ({songs}) => {

  const[isPlaying,setIsPlaying] = useState(null)

  const handlePlayPause = (index) =>{
    if(isPlaying === index){
      setIsPlaying(null);
    }
    else{
      setIsPlaying(index)
    }
  };

  return (
   <div className="song-card-container">
  <h2 className="song-heading">Recommend Song</h2>

  {songs.map((song, index) => (
    <div key={index} className="song-card">
      
      <div className="song-info">
        <li className="song-title">{song.title}</li>
        <li className="song-artist">{song.artist}</li>
      </div>

      <div className="play-pause-button">
        {isPlaying === index && (
          <audio
            src={song.audio}
            className="audio-element"
            autoPlay
          ></audio>
        )}

        <button
          className="play-btn"
          onClick={() => handlePlayPause(index)}
        >
          {isPlaying === index ? "Pause" : "Play"}
        </button>
      </div>

    </div>
  ))}
</div>
  )
}

export default SongCaed
