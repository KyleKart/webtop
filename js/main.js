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
  content: `<iframe src="./applications/welcome.html" width="100%" height="100%" style="border:none;"></iframe>`,
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

const optionMenu = document.getElementById('settings');

optionMenu.addEventListener('click', (e) => {
    windowManager.createWindow({
      title: 'Settings',
      content: `<iframe src="./applications/settings.html" width="100%" height="100%" style="border:none;" allowtransparency="true"></iframe>`,
      x: 200,
      y: 150,
      width: 800,
      height: 600
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
