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
          content: `<iframe src="https://unduck.link?q=${encodeURIComponent(query)}" width="100%" height="100%" style="border:none;"></iframe>`,
          x: 200,
          y: 150,
          width: 800,
          height: 600
      });
  }
});

windowManager.createWindow({
  title: 'Welcome',
  content: `<!DOCTYPE html><html><head><title>Welcome</title><style>html, body {height: 100%; margin: 0; padding: 0; background: rgba(0, 0, 0, 0.7);} h1, p, b, ul {color: #fff; line-height: 1.5;}</style></head><body><div class="message"><h1>Welcome to Your Webtop!</h1><p>This should feel familiar if you've used a desktop interface before.</p><p><b>Window Controls, similar to early versions of Microsoft Windows, work as follows:</b></p><ul><li><b>Left Side:</b> If the program has an icon, it appears here; otherwise, a red ❌ is shown. <b>Double-click</b> to close the window.</li><li><b>Right Side:</b> <b>➖ Minus (-)</b> minimizes the window, and <b>➕ Plus (+)</b> maximizes/restores it.</li></ul><p>Enjoy browsing your Webtop!</p></div></body></html>`,
  x: 100,
  y: 100,
  width: 800,
  height: 600
});

document.querySelectorAll('.desktop-icon').forEach(icon => {
  const title = icon.getAttribute('data-title');
  const span = document.createElement('span');
  span.textContent = title;
  icon.appendChild(span);
  icon.addEventListener('dblclick', () => {
    const title = icon.getAttribute('data-title');
    const url = icon.getAttribute('data-url');
    const width = icon.getAttribute('data-width');
    const height = icon.getAttribute('data-height');
    const iconSrc = icon.querySelector('img').getAttribute('src');

    windowManager.createWindow({
      title: title,
      icon: iconSrc,
      content: `<iframe src="${url}" width="100%" height="100%" style="border:none;" allowtransparency="true"></iframe>`,
      x: 200,
      y: 150,
      width: width,
      height: height
    });
  });
});

window.addEventListener('beforeunload', (event) => {
  const confirmation = confirm("Webtop got a shutdown request. Was this what you wanted?");
  if (!confirmation) {
    event.preventDefault();
    event.returnValue = '';
  } else {
  }
});
