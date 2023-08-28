import React, { useState, useRef } from 'react';
import './pixelartcanvas.css';
import html2canvas from 'html2canvas';

const PixelArtCanvas = ({ selectedColor }) => {
  const gridSize = 20; // 20x20 grid
  const cellSize = 40; // Cell size in pixels
  const totalCells = gridSize * gridSize;

  const [isPainting, setIsPainting] = useState(false);
  const [cellColors, setCellColors] = useState(Array(totalCells).fill(''));
  const [history, setHistory] = useState([]);

  const handleCellClick = (index) => {
    const updatedCellColors = [...cellColors];
    updatedCellColors[index] = selectedColor;
    setCellColors(updatedCellColors);
    setHistory((prevHistory) => [...prevHistory, updatedCellColors]);
  };

  const handleUndoClick = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setCellColors(previousState);
      setHistory(history.slice(0, -1));
    }
  };

  const handleMouseDown = () => {
    setIsPainting(true);
  };

  const handleMouseUp = () => {
    setIsPainting(false);
  };

  const handleMouseEnter = (index) => {
    if (isPainting) {
      handleCellClick(index);
    }
  };

  const handleTouchStart = () => {
    setIsPainting(true);
  };

  const handleTouchEnd = () => {
    setIsPainting(false);
  };

  const handleTouchMove = (event, index) => {
    if (isPainting) {
      event.preventDefault();
      handleCellClick(index);
    }
  };

  const canvasRef = useRef(null);

  const handleSaveClick = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      html2canvas(canvas).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.download = 'pixel_art_creation.jpg';
        link.href = imgData;
        link.click();
      });
    }
  };

  const handleExportClick = () => {
    const exportData = JSON.stringify(cellColors);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'pixel_art_data.json';
    link.href = url;
    link.click();
  };

  const handleImportChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const importedData = JSON.parse(e.target.result);
        setCellColors(importedData);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="canvas">
      <div
        ref={canvasRef}
        className="pixel-grid"
        onMouseLeave={handleMouseUp}
        onTouchEnd={handleTouchEnd}
      >
        {Array.from({ length: totalCells }).map((_, index) => (
          <div
            key={index}
            className="pixel-cell"
            style={{
              width: cellSize,
              height: cellSize,
              backgroundColor: cellColors[index],
            }}
            onClick={() => handleCellClick(index)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseEnter={() => handleMouseEnter(index)}
            onTouchStart={handleTouchStart}
            onTouchMove={(event) => handleTouchMove(event, index)}
          ></div>
        ))}
      </div>
      <div className="button-group">
        <button className="undo-button" onClick={handleUndoClick}>
          Undo
        </button>
        <button className="save-button" onClick={handleSaveClick}>
          Save
        </button>
        <input
          type="file"
          accept=".json"
          onChange={handleImportChange}
          className="import-input"
        />
        <button className="export-button" onClick={handleExportClick}>
          Export
        </button>
      </div>
    </div>
  );
};

export default PixelArtCanvas;
