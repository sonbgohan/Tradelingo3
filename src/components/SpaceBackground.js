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
    
    // Sterren eigenschappen
    const stars = [];
    const starCount = 200; // Aantal sterren
    const maxStarSize = 3;
    
    // Maak sterren aan
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * maxStarSize,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        brightness: Math.random(),
        blinkSpeed: 0.01 + Math.random() * 0.02
      });
    }
    
    // Nevels (melkwegwolken)
    const nebulae = [];
    const nebulaCount = 5; // Aantal nevels
    
    // Creëer nevels
    for (let i = 0; i < nebulaCount; i++) {
      nebulae.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 100 + Math.random() * 200,
        color: `rgba(${30 + Math.random() * 20}, ${50 + Math.random() * 100}, ${150 + Math.random() * 100}, 0.05)`,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1
      });
    }
    
    // Animatie functie
    const animate = () => {
      // Achtergrond verloop van donkerblauw naar zwart
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0a0a1f');
      gradient.addColorStop(1, '#000005');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Teken nevels
      nebulae.forEach(nebula => {
        // Beweeg nevel
        nebula.x += nebula.speedX;
        nebula.y += nebula.speedY;
        
        // Laat nevel aan andere kant terugkomen als deze buiten het scherm gaat
        if (nebula.x < -nebula.size) nebula.x = canvas.width + nebula.size;
        if (nebula.x > canvas.width + nebula.size) nebula.x = -nebula.size;
        if (nebula.y < -nebula.size) nebula.y = canvas.height + nebula.size;
        if (nebula.y > canvas.height + nebula.size) nebula.y = -nebula.size;
        
        // Maak een radial gradient voor elke nevel
        const nebulaGradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.size
        );
        
        nebulaGradient.addColorStop(0, nebula.color);
        nebulaGradient.addColorStop(1, 'rgba(0, 0, 20, 0)');
        
        ctx.fillStyle = nebulaGradient;
        ctx.beginPath();
        ctx.arc(nebula.x, nebula.y, nebula.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Teken sterren
      stars.forEach(star => {
        // Beweeg ster
        star.x += star.speedX;
        star.y += star.speedY;
        
        // Laat ster aan andere kant terugkomen als deze buiten het scherm gaat
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        
        // Laat ster knipperen
        star.brightness += star.blinkSpeed;
        if (star.brightness > 1 || star.brightness < 0.3) {
          star.blinkSpeed = -star.blinkSpeed;
        }
        
        // Teken ster
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * star.brightness, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();
        
        // Teken optionele gloed rond helderdere sterren
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 220, 255, ${star.brightness * 0.2})`;
          ctx.fill();
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
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
