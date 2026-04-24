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

          console.log(_expression)
          /*get http:// localhost:3000/api/songs?mood=happy*/
          // axios.get(`http://localhost:3000/api/songs?mood=${_expression}`)
          axios.get(`${import.meta.env.VITE_API_URL}/api/songs?mood=${_expression}`)
          .then(response=>{
            console.log(response.data)
          setSongs(response.data.songs)})

          

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

      <video className ="face-video"
        ref={videoRef}
        autoPlay
        muted
        width="400"
        style={{ borderRadius: "10px" }}
      />

      <h3>Mood: {mood}</h3>
      <div>
  <h4>Expression Scores:</h4>
  {Object.entries(allExpressions).map(([key, value]) => (
    <div key={key}>
      {key}: {(value * 100).toFixed(2)}%
    </div>
  ))}
</div>
      <button onClick={detectMood}>Detect Mood</button>
    </div>
  );
};

export default FaceExpression;