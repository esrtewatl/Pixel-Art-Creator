import React from 'react';
import './ColorPicker.css';

const ColorPicker = ({ selectedColor, onSelectColor }) => {
  const colors = [
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFA500', // Orange
    '#800080', // Purple
    '#000000', // Black
    '#FF5733', // Coral
    '#4CAF50', // Green
    '#9C27B0', // Purple
    '#2196F3', // Blue
  ]; // Add more colors as needed

  return (
    <div className="color-picker">
      {colors.map((color) => (
        <div
          key={color}
          className={`color-option ${selectedColor === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => {
            console.log('Color selected:', color);
            onSelectColor(color);
          }}
        ></div>
      ))}
    </div>
  );
};

export default ColorPicker;
