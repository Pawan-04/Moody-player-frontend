import React from 'react';
import './ProjectDetails.css';

const ProjectDetails = () => {
  return (
    <section id="how-it-works" className="project-details-container">
      <div className="details-header">
        <h2>How It Works</h2>
        <p>Your face tells a story. We provide the soundtrack.</p>
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <div className="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          </div>
          <h3>1. Camera Detection</h3>
          <p>We use a state-of-the-art AI model directly in your browser to analyze your facial micro-expressions in real-time, completely privately.</p>
        </div>

        <div className="detail-card">
          <div className="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
          </div>
          <h3>2. Mood Analysis</h3>
          <p>Our algorithm breaks down your current expression into a comprehensive emotional profile, determining your exact mood.</p>
        </div>

        <div className="detail-card">
          <div className="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
          </div>
          <h3>3. Song Curation</h3>
          <p>Based on your mood, we instantly fetch the perfect track from our curated database to match exactly how you're feeling right now.</p>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
