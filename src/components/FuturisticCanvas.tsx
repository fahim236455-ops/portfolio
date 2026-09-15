import React, { useEffect, useRef } from 'react';

export const FuturisticCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Particle nodes for abstract tech grid / constellation
    const nodesCount = 45;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; baseAlpha: number }[] = [];

    for (let i = 0; i < nodesCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.8,
        baseAlpha: Math.random() * 0.5 + 0.2,
      });
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.005;

      // Draw subtle background wireframe grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;

      // Draw rotating abstract 3D wireframe geometric core (cube / diamond cluster)
      const centerX = width * 0.72;
      const centerY = height * 0.45;
      const radius = Math.min(width, height) * 0.22;

      // Only draw geometric object if screen is wider than mobile
      if (width > 640) {
        ctx.save();
        ctx.translate(centerX, centerY);

        const verticesCount = 8;
        const pts: { x: number; y: number; z: number }[] = [];

        for (let i = 0; i < verticesCount; i++) {
          const theta = (i / (verticesCount / 2)) * Math.PI + angle;
          const phi = (i % 2 === 0 ? 0.4 : -0.4) + Math.sin(angle * 1.5) * 0.2;
          const px = Math.cos(theta) * Math.cos(phi) * radius;
          const py = Math.sin(phi) * radius;
          const pz = Math.sin(theta) * Math.cos(phi) * radius;
          pts.push({ x: px, y: py, z: pz });
        }

        // Connect points with glowing electric violet lines
        ctx.lineWidth = 1.2;
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const dz = pts[i].z - pts[j].z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < radius * 1.5) {
              const alpha = (1 - dist / (radius * 1.5)) * 0.35;
              const gradient = ctx.createLinearGradient(pts[i].x, pts[i].y, pts[j].x, pts[j].y);
              gradient.addColorStop(0, `rgba(139, 92, 246, ${alpha})`);
              gradient.addColorStop(1, `rgba(59, 130, 246, ${alpha})`);
              ctx.strokeStyle = gradient;

              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.stroke();
            }
          }
        }

        // Draw glowing vertex points
        pts.forEach((pt) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(167, 139, 250, 0.8)';
          ctx.shadowColor = '#8b5cf6';
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        ctx.restore();
      }

      // Update and render constellation particles
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${node.baseAlpha})`;
        ctx.fill();

        // Connect close particles with delicate threads
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - dist / 120) * 0.15})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
