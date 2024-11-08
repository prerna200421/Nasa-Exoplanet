// src/components/DrawingBoard.js
import React, { useRef, useState, useEffect } from 'react';
import '../pages/styles/Draw.css';

const DrawingBoard = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil'); // Default tool is pencil
  const [color, setColor] = useState('#000000'); // Default color is black
  const [lineWidth, setLineWidth] = useState(5); // Default stroke width
  const [textMode, setTextMode] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [isTypingText, setIsTypingText] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    const context = contextRef.current;
    context.strokeStyle = color;
  }, [color]);

  useEffect(() => {
    const context = contextRef.current;
    context.lineWidth = lineWidth;
  }, [lineWidth]);

  // Start drawing
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (tool === 'pencil' || tool === 'brush') {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    } else if (tool === 'eraser') {
      contextRef.current.clearRect(offsetX, offsetY, lineWidth, lineWidth);
    } else if (tool === 'text') {
      setTextMode(true);
      setIsTypingText(true);
    }
  };

  const finishDrawing = () => {
    if (isDrawing) {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
    setTextMode(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;

    if (tool === 'pencil' || tool === 'brush') {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    } else if (tool === 'eraser') {
      contextRef.current.clearRect(offsetX, offsetY, lineWidth, lineWidth);
    }
  };

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Save drawing as image
  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'drawing.png';
    link.click();
  };

  // Handle adding text to the canvas
  const addTextToCanvas = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (isTypingText && textInput.trim() !== '') {
      context.font = `${lineWidth * 4}px Arial`;
      context.fillStyle = color;
      context.fillText(textInput, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      setTextInput('');
      setIsTypingText(false);
    }
  };

  // Button styling helper
  const isToolSelected = (currentTool) => (tool === currentTool ? 'selected-btn' : 'control-btn');

  return (
    <div className="drawing-container">
      <div className="controls">
        {/* Tools */}
        <button className={isToolSelected('pencil')} onClick={() => setTool('pencil')}>Pencil</button>
        <button className={isToolSelected('brush')} onClick={() => setTool('brush')}>Brush</button>
        <button className={isToolSelected('eraser')} onClick={() => setTool('eraser')}>Eraser</button>
        <button className={isToolSelected('text')} onClick={() => setTool('text')}>Text</button>

        {/* Line Width */}
        <label>
          Line Width:
          <input
            type="range"
            min="1"
            max="50"
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value, 10))}
          />
        </label>

        {/* Color Picker */}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        {/* Actions */}
        <button className= "control-btn" onClick={clearCanvas}>Clear</button>
        <button  className= "control-btn" onClick={saveCanvas}>Download</button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={textMode ? addTextToCanvas : startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />

      {/* Text Input */}
      {tool === 'text' && isTypingText && (
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Type your text here"
        />
      )}
    </div>
  );
};

export default DrawingBoard;