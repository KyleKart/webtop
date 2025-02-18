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
      windowManager.createWindow({
          title: `Search: ${query}`,
          content: `<iframe src="https://4get.ca/web?s=${encodeURIComponent(query)}" width="100%" height="100%" style="border:none;"></iframe>`,
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

document.querySelectorAll('.desktop-icon').forEach(icon => {
  icon.addEventListener('dblclick', () => {
    if (icon.getAttribute('data-app') === "ClassiCube") {
      let query = prompt("Enter search query:");
      if (query) {
        windowManager.createWindow({
          title: `ClassiCube`,
          content: `<iframe src="https://www.classicube.net/server/play/?warned=true" width="100%" height="100%" style="border:none;"></iframe>`,
          x: 200,
          y: 150,
          width: 782,
          height: 440
        });
      }
    } else {
      alert(`Unknown app: ${app}`);
    }
  });
});
