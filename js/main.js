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
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none"; // Optional: Remove border
    
    // Wrap it in a div to prevent raw object output
    const wrapper = document.createElement("div");
    wrapper.appendChild(iframe);
    
    // Create the window
    const win = windowManager.createWindow({
        title: "Loading...",
        content: wrapper, // Ensure wrapper is passed
        x: 200,
        y: 150,
        width: 800,
        height: 600
    });
    
    // Update title when iframe loads
    iframe.onload = () => {
        try {
            win.setTitle(iframe.contentDocument.title || "No Title");
        } catch (e) {
            win.setTitle("External Page"); // Cross-origin fallback
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

