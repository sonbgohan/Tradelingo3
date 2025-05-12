import React, { useEffect, useRef } from 'react';
import './SpaceBackground.css';

const SpaceBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Stel canvas grootte in op volledige scherm
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Update canvas grootte bij resize
    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();
    
    // Teken de statische ruimte-achtergrond
    const drawBackground = () => {
      // Subtiele achtergrond verloop voor een professionele look
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0a0f1a');
      gradient.addColorStop(1, '#141c2e');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Teken wat subtiele netpattroon (grid) voor een tech/finance uitstraling
      drawGrid();
      
      // Voeg wat ingetogen sterren toe (minder dan voorheen)
      drawStars();
      
      // Teken subtiele nevel effect
      drawSubtleNebula(canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.8, 'rgba(30, 64, 110, 0.03)');
    };
    
    // Functie om een subtiel grid te tekenen
    const drawGrid = () => {
      const gridSize = 50;
      const gridOpacity = 0.05;
      
      ctx.strokeStyle = `rgba(120, 160, 200, ${gridOpacity})`;
      ctx.lineWidth = 0.5;
      
      // Verticale lijnen
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontale lijnen
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };
    
    // Teken wat ingetogen sterren
    const drawStars = () => {
      const starCount = 200; // Minder sterren voor een strakkere look
      
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5; // Kleinere sterren
        const brightness = 0.2 + Math.random() * 0.3; // Minder helder
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx.fill();
      }
    };
    
    // Subtiele nevel/wolk effect voor diepte
    const drawSubtleNebula = (x, y, size, color) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fill();
    };
    
    // Teken de achtergrond
    drawBackground();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="space-background"
    />
  );
};

export default SpaceBackground;
