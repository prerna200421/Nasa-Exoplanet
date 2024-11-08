// src/App.js
import React from 'react';
import DrawingBoard from '../components/DrawingBoard';

function Draw() {
  return (
    <div className="DrawContainer">
      <h1>Draw Your Exoplanet</h1>
      <DrawingBoard />
    </div>
  );
}

export default Draw;