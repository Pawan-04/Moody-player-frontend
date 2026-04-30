import React, { useState, useRef, useEffect } from 'react';
import "./SongCard.css"

const SongRow = ({ song, index, isActive, isPlaying, onSelect }) => {
  return (
    <div className={`song-card ${isActive ? 'playing' : ''}`} onClick={onSelect} style={{ cursor: 'pointer' }}>
      <div className="song-left-wrapper">
        <div className="song-index">
          {(isActive && isPlaying) ? (
            <div className="equalizer">
              <div className="equalizer-bar"></div>
              <div className="equalizer-bar"></div>
              <div className="equalizer-bar"></div>
            </div>
          ) : (
            index + 1
          )}
        </div>
        
        <div className="song-info">
          <div className="song-title">{song.title}</div>
          <div className="song-artist">{song.artist}</div>
        </div>
      </div>

      <div className="play-pause-button">
        <button
          className="play-btn"
          title={isActive && isPlaying ? "Pause" : "Play"}
        >
          {isActive && isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          )}
        </button>
      </div>
    </div>
  );
};

const GlobalPlayer = ({ song, isPlaying, onPlayPause, onNext, onPrev, onEnded }) => {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, song]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="global-player-bar">
      <audio
        ref={audioRef}
        src={song.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onEnded}
      ></audio>

      <div className="gp-left">
        <div className="gp-song-info">
          <div className="gp-title">{song.title}</div>
          <div className="gp-artist">{song.artist}</div>
        </div>
      </div>

      <div className="gp-center">
        <div className="gp-controls">
          <button className="gp-control-btn" onClick={onPrev}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2"></line></svg>
          </button>
          
          <button className="gp-play-btn" onClick={onPlayPause}>
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            )}
          </button>
          
          <button className="gp-control-btn" onClick={onNext}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2"></line></svg>
          </button>
        </div>

        <div className="gp-progress">
          <span className="gp-time">{formatTime(currentTime)}</span>
          <input 
            type="range" 
            min="0" 
            max={duration || 0} 
            value={currentTime} 
            onChange={handleSeek}
            className="gp-seek-bar"
          />
          <span className="gp-time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="gp-right">
      </div>
    </div>
  );
};

const SongCaed = ({songs}) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Reset player when songs change
  useEffect(() => {
    setCurrentSongIndex(null);
    setIsPlaying(false);
  }, [songs]);

  const handleSelectSong = (index) => {
    if (currentSongIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!songs || songs.length === 0) return;
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (!songs || songs.length === 0) return;
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="song-card-container">
      <h2 className="song-heading">Recommended Songs</h2>

      {(!songs || songs.length === 0) ? (
        <div className="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
          <p>No songs found for this mood.</p>
          <p style={{fontSize: '0.9rem', opacity: 0.7}}>Try detecting a different expression!</p>
        </div>
      ) : (
        <div className="songs-list">
          {songs.map((song, index) => (
            <SongRow 
              key={index} 
              song={song} 
              index={index} 
              isActive={currentSongIndex === index}
              isPlaying={currentSongIndex === index && isPlaying}
              onSelect={() => handleSelectSong(index)}
            />
          ))}
        </div>
      )}

      {currentSongIndex !== null && songs && songs[currentSongIndex] && (
        <GlobalPlayer 
          song={songs[currentSongIndex]}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
          onEnded={handleNext}
        />
      )}
    </div>
  )
}

export default SongCaed;
