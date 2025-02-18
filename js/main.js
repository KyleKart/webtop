import { WindowManager } from './windowManager.js';
import { startMenuManager } from './startMenuManager.js';
import { clockManager } from './clockManager.js';

// Initialize managers
const windowManager = new WindowManager();
const startMenu = startMenuManager();
clockManager();

document.getElementById('search-button').addEventListener('click', () => {
  const query = document.getElementById('taskbar-input').value;
  if (query) {
    const iframe = document.createElement("iframe");
    iframe.src = query;
    iframe.width = "100%";
    iframe.height = "100%";
        const wrapper = document.createElement("div");
    wrapper.appendChild(iframe);
    
    const win = windowManager.createWindow({
        title: "Loading...", // Temporary title
        content: wrapper,
        x: 200,
        y: 150,
        width: 800,
        height: 600
    });
    
    iframe.onload = () => {
        try {
            win.setTitle(iframe.contentDocument.title || "No Title"); // Update title
        } catch (e) {
            win.setTitle("External Page"); // Fallback for cross-origin errors
        }
    };    
  }
});

// Example window creation
windowManager.createWindow({
  title: 'Welcome',
  content: 'Welcome to Web Desktop!',
  x: 100,
  y: 100,
  width: 400,
  height: 300
});

