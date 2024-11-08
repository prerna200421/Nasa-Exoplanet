import React from 'react';

const GamePage = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="/Game.html"  // Path to your game HTML file in the public folder
        width="100%"
        height="100%"
        title="Flappy Spaceship Game"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
};

export default GamePage;