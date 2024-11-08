import React from 'react';

function NasaResources() {
  return (
    <div className="resource-card">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg" 
        alt="NASA" 
        className="resource-image" 
      />
      <h2>NASA Resources</h2>
      <p>Access official NASA tools, articles, and more.</p>
      <a href="https://www.nasa.gov/" target="_blank" rel="noopener noreferrer">
        Learn More
      </a>
    </div>
  );
}

export default NasaResources;