# Za Website (Vite + React + TS)

Run locally
1. Install dependencies
   npm install
2. Start the dev server
   npm run dev
3. Open the URL shown in the terminal (usually http://localhost:5173)

If you see Unknown at rule @tailwind:
- Make sure you run via npm run dev (Vite processes PostCSS + Tailwind)
- Confirm postcss.config.js and tailwind.config.js exist (they do in this repo)

Adding servers
- Put JSON files in src/data/servers/
- You can use:
  - a single object, or
  - an array of server objects, or
  - an object with a servers array
- See src/data/servers/khxzi.json for examples. Keys starting with __ are ignored and serve as inline notes.

Assets
- Cursor images: /cursors
- Social/link images and GIFs: /img-assets (imported by the components)

Notes
- Owner Panel button is removed per request.
- Cursors rotate every 10s and stay the same on hover.
