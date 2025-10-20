import { useEffect, useRef } from 'react';

// Eagerly import available cursor images from /cursors
const modules = import.meta.glob('../../cursors/*.{png,jpg,jpeg,webp,gif,cur}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const images: string[] = Object.values(modules);

const cache = new Map<string, Promise<string>>();

async function toPngDataUrl(src: string): Promise<string> {
  // Heuristic: if already a .png/.cur/.ico/.gif use as-is
  if (/\.(png|cur|ico|gif)$/i.test(src)) return src;
  // Cache conversions to avoid repeated canvas work
  if (!cache.has(src)) {
    const p = new Promise<string>((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const size = 32; // standard square for consistent hotspot at 16,16
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // center image into square canvas
          const scale = Math.min(size / img.width, size / img.height);
          const w = img.width * scale;
          const h = img.height * scale;
          const x = (size - w) / 2;
          const y = (size - h) / 2;
          ctx.clearRect(0, 0, size, size);
          ctx.drawImage(img, x, y, w, h);
          resolve(canvas.toDataURL('image/png'));
        } else {
          resolve(src);
        }
      };
      img.onerror = () => resolve(src);
      img.src = src;
    });
    cache.set(src, p);
  }
  return cache.get(src)!;
}

export default function CursorCycle() {
  const indexRef = useRef<number>(-1);

  useEffect(() => {
    if (!images.length) return;

    const setCursor = async (url: string) => {
      // Convert to PNG data URL when needed for broader cursor support
      const dataUrl = await toPngDataUrl(url);
      // Adjust hotspot near center of 32x32; browsers clamp as needed
      const value = `url(${dataUrl}) 16 16, auto`;
      document.documentElement.style.setProperty('--app-cursor', value);
    };

    // Pick a different random image than last
    const pickNext = () => {
      if (images.length === 1) return images[0];
      let next = indexRef.current;
      while (next === indexRef.current) {
        next = Math.floor(Math.random() * images.length);
      }
      indexRef.current = next;
      return images[next];
    };

    // Set immediately on mount
  setCursor(pickNext());

    // Change every 10 seconds
    const id = window.setInterval(() => {
      const u = pickNext();
      setCursor(u);
    }, 10000);

    return () => {
      window.clearInterval(id);
      // Optional: restore default
      document.documentElement.style.removeProperty('--app-cursor');
    };
  }, []);

  return null;
}
