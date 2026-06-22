import React, { useEffect, useRef } from 'react';

export default function GalaxyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId;

    // Mouse interaction
    const mouse = { x: null, y: null, radius: 150 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    class Particle {
      constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.5 + 0.1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for performance
      }

      update() {
        // Orbital movement
        this.angle += this.speed * 0.01;
        
        // Simple drift
        this.y -= this.velocity.y;
        this.x -= this.velocity.x;
        
        // Wrap around screen
        if (this.y < 0) this.y = height;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.x > width) this.x = 0;

        // Base positions tracking for mouse interaction
        this.baseX -= this.velocity.x;
        this.baseY -= this.velocity.y;

        if (this.baseY < 0) this.baseY = height;
        if (this.baseX < 0) this.baseX = width;
        if (this.baseY > height) this.baseY = 0;
        if (this.baseX > width) this.baseX = 0;


        // Mouse Interaction
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          
          if (force < 0) force = 0;

          let directionX = forceDirectionX * force * 3;
          let directionY = forceDirectionY * force * 3;

          // Repel
          if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
          } else {
            // Return to base position softly
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx/20;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy/20;
            }
          }
        } else {
           // Return to base position softly
           if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx/20;
          }
          if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy/20;
          }
        }

        this.draw();
      }
    }

    const initParticles = () => {
      particles = [];
      const numParticles = (width * height) / 8000; // Adjust density
      
      const colors = ['#b026ff', '#00e5ff', '#ffffff', '#ff9c00'];

      for (let i = 0; i < numParticles; i++) {
        let x = Math.random() * width;
        let y = Math.random() * height;
        let radius = Math.random() * 1.5 + 0.5;
        let color = colors[Math.floor(Math.random() * colors.length)];
        let velocity = {
          x: (Math.random() - 0.5) * 0.5,
          y: Math.random() * 0.5 + 0.2 // Drift slowly upwards
        };
        particles.push(new Particle(x, y, radius, color, velocity));
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      
      // Draw constellations (lines between close particles)
      connectParticles();
    };
    
    const connectParticles = () => {
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = dx * dx + dy * dy;
                
                if (distance < (width/12) * (height/12)) {
                    opacityValue = 1 - (distance/15000);
                    ctx.strokeStyle = `rgba(176, 38, 255, ${opacityValue * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)', // Fallback
        pointerEvents: 'none' // Ensure it doesn't block clicks
      }}
    />
  );
}
