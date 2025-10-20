import { useEffect, useRef } from 'react';

// Load all cursor images from the project's cursors folder
const modules = import.meta.glob('../../cursors/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const sources: string[] = Object.values(modules);

export default function CursorBurst() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastPos = useRef<{ x: number; y: number }>({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const container = document.createElement('div');
    container.className = 'cursor-burst-container';
    document.body.appendChild(container);
    containerRef.current = container;

    const spawn = (x: number, y: number, opts?: { force?: boolean }) => {
      if (!containerRef.current || sources.length === 0) return;
      // Small random throttle unless forced
      if (!opts?.force && Math.random() > 0.15) return; // 15% chance per event

      const img = document.createElement('img');
      img.src = sources[Math.floor(Math.random() * sources.length)];
      img.className = 'cursor-burst-img';
      const size = 18 + Math.random() * 26; // 18-44px
      const angle = (Math.random() * 40 - 20) * (Math.PI / 180); // -20..20deg drift
      const dx = Math.cos(angle) * (10 + Math.random() * 30);
      const dy = Math.sin(angle) * (10 + Math.random() * 30);
      const rot = Math.random() * 360;

      img.style.position = 'absolute';
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.width = `${size}px`;
      img.style.height = 'auto';
      img.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;
      img.style.opacity = '0.95';
      img.style.willChange = 'transform, opacity';
      img.style.filter = 'drop-shadow(0 6px 10px rgba(0,0,0,0.35))';
      img.style.pointerEvents = 'none';

      containerRef.current.appendChild(img);

      const duration = 1200 + Math.random() * 600; // 1.2 - 1.8s
      const start = performance.now();
      const startX = x;
      const startY = y;

      const animate = (t: number) => {
        const el = img;
        const p = Math.min(1, (t - start) / duration);
        // ease-out
        const e = 1 - Math.pow(1 - p, 3);
        const cx = startX + dx * e;
        const cy = startY + dy * e - 10 * e; // slight upward drift
        const scale = 1 + 0.4 * (1 - p);
        el.style.transform = `translate(-50%, -50%) translate(${cx - x}px, ${cy - y}px) rotate(${rot + 45 * e}deg) scale(${scale})`;
        el.style.opacity = String(0.95 * (1 - p));
        if (p < 1) requestAnimationFrame(animate);
        else el.remove();
      };
      requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      lastPos.current = { x: e.clientX, y: e.clientY };
      spawn(e.clientX, e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      lastPos.current = { x: e.clientX, y: e.clientY };
      spawn(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    // Periodic random spawn near last position even if idle
    const interval = window.setInterval(() => {
      const { x, y } = lastPos.current;
      const jitterX = x + (Math.random() * 40 - 20);
      const jitterY = y + (Math.random() * 40 - 20);
      spawn(jitterX, jitterY, { force: true });
    }, 1800);

    return () => {
      window.removeEventListener('mousemove', onMove as any);
      window.removeEventListener('mouseover', onOver as any);
      window.clearInterval(interval);
      containerRef.current?.remove();
      containerRef.current = null;
    };
  }, []);

  return null;
}
