import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import './FaceExpression.css'
import axios from 'axios'

const FaceExpression = ({setSongs}) => {
  const [allExpressions, setAllExpressions] = useState({});
  const videoRef = useRef();
  const [mood, setMood] = useState("Loading...");

  async function detectMood(){
     // setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();

        if (detections.length > 0) {
          const expressions = detections[0].expressions;

          const currentMood = Object.keys(expressions).reduce((a, b) =>
            expressions[a] > expressions[b] ? a : b
          );

          setMood(currentMood);

          let  mostProbleExpression = 0;
          let _expression = '';
          for(const expression of Object.keys(detections[0].expressions)){
            if(detections[0].expressions[expression] > mostProbleExpression){
              mostProbleExpression = detections[0].expressions[expression] 
              _expression = expression
            }
          }
          setAllExpressions(expressions);

          console.log("Detecting mood:", _expression);
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
          
          axios.get(`${apiUrl}/api/songs?mood=${_expression}`)
            .then(response => {
              console.log("Songs fetched:", response.data);
              setSongs(response.data.songs || []);
            })
            .catch(error => {
              console.error("Error fetching songs:", error);
              setSongs([]);
            });

          

        } else {
          setMood("No face detected");
        }
      //}, 2000);
      
  }

  useEffect(() => {
    start();
  }, []);

  const start = async () => {
    const MODEL_URL = "/models";

    // Load models
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

    console.log("Models Loaded ✅");

    // Start camera
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;

    // Detect when video plays
    videoRef.current.addEventListener("play", () => {
      
    
    });
  };

  return (
    <div className="face-expression-main">
      <h2>Facial Mood Detector</h2>

      <div className="video-container">
        <video className="face-video"
          ref={videoRef}
          autoPlay
          muted
        />
      </div>

      <div className="mood-badge-container">
        <h3>Current Mood:</h3>
        <div className="mood-badge">{mood}</div>
      </div>
      
      <div className="expressions-container">
        <h4>Expression Scores</h4>
        {Object.entries(allExpressions).map(([key, value]) => (
          <div key={key} className="expression-item">
            <span className="expression-label">{key}</span>
            <div className="expression-bar-bg">
              <div 
                className="expression-bar-fill" 
                style={{ width: `${(value * 100).toFixed(2)}%` }}
              ></div>
            </div>
            <span className="expression-value">{(value * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
      
      <button className="detect-btn" onClick={detectMood}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
        Detect Mood
      </button>
    </div>
  );
};

export default FaceExpression;