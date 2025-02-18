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
    windowManager.createWindow({
      title: iframe.title,
      content: iframe,
      x: 200,
      y: 150,
      width: 800,
      height: 600
  });
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

