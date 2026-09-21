
import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    w: number;
    h: number;
    vx: number;
    vy: number;
    color: string;
    rotation: number;
    rSpeed: number;
    life: number;
    type: 'rect' | 'code';
    char?: string;
}

const CyberConfetti: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const animationId = useRef<number>(0);

    const colors = ['#00f3ff', '#ff00ff', '#00ff41', '#fcee0a', '#ffffff'];
    const chars = ['0', '1', '{', '}', '<', '>', '/', '*', ';'];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Spawn Particles
        for (let i = 0; i < 150; i++) {
            particles.current.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                w: Math.random() * 10 + 5,
                h: Math.random() * 10 + 5,
                vx: (Math.random() - 0.5) * 20,
                vy: (Math.random() - 0.5) * 20 - 5, // Upward bias
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rSpeed: (Math.random() - 0.5) * 10,
                life: 1.0,
                type: Math.random() > 0.5 ? 'rect' : 'code',
                char: chars[Math.floor(Math.random() * chars.length)]
            });
        }

        const render = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.2; // Gravity
                p.vx *= 0.95; // Drag
                p.life -= 0.008;
                p.rotation += p.rSpeed;

                if (p.life <= 0) {
                    particles.current.splice(i, 1);
                    return;
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;

                if (p.type === 'rect') {
                    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                } else {
                    ctx.font = 'bold 20px monospace';
                    ctx.fillText(p.char!, -5, 5);
                }
                
                ctx.restore();
            });

            if (particles.current.length > 0) {
                animationId.current = requestAnimationFrame(render);
            }
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId.current);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="fixed inset-0 pointer-events-none z-[100]"
        />
    );
};

export default CyberConfetti;
