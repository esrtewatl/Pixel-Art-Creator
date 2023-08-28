import React, { useState } from 'react';
import './App.css';
import PixelArtCanvas from './components/PixelArtCanvas';
import ColorPicker from './components/ColorPicker';

function App() {
  const [selectedColor, setSelectedColor] = useState('#FF0000'); // Default color

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Pixel Pal Creator</h1>
      </header>
      <main className="app-main">
        <div className="app-content">
          {/* Pass the selectedColor state and the function to update it */}
          <ColorPicker selectedColor={selectedColor} onSelectColor={setSelectedColor} />
          {/* Pass the selectedColor state to the PixelArtCanvas component */}
          <PixelArtCanvas selectedColor={selectedColor} />
        </div>
      </main>
      <footer className="app-footer">
        <p>&copy; 2023 Pixel Pal Creator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
