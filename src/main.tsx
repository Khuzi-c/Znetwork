import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App_ZaWebsite';
import './index.css';

// Error boundary for debugging
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  document.body.innerHTML = `
    <div style="
      display: flex; 
      justify-content: center; 
      align-items: center; 
      min-height: 100vh; 
      background: linear-gradient(135deg, #D51A0C 0%, #3B04E0 50%, #03124C 100%);
      color: white;
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
    ">
      <div>
        <h1>Za Website</h1>
        <p>Loading error occurred. Please refresh the page.</p>
        <button onclick="window.location.reload()" style="
          background: #3B04E0;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
        ">Refresh Page</button>
      </div>
    </div>
  `;
}
