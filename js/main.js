import { WindowManager } from './windowManager.js';
import { startMenuManager } from './startMenuManager.js';
import { clockManager } from './clockManager.js';

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
    if (icon.getAttribute('data-app') === "MCC") {
        windowManager.createWindow({
          title: `Minecraft Classic`,
          icon: icon.querySelector('img').getAttribute('src'),
          content: `<iframe src="https://classic.minecraft.net" width="100%" height="100%" style="border:none;"></iframe>`,
          x: 200,
          y: 150,
          width: 782,
          height: 472
        });
      } else if (icon.getAttribute('data-app') === "Discord") {
        windowManager.createWindow({
          title: `Discord`,
          icon: icon.querySelector('img').getAttribute('src'),
          content: `<iframe src="https://www.discord.com/app" width="100%" height="100%" style="border:none;"></iframe>`,
          x: 200,
          y: 150,
          width: 1024,
          height: 700
        });
      } else {
        alert(`Unknown app: ${icon.getAttribute('data-app')}`);
    }
  });
});
