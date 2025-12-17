import { WindowManager } from './windowManager.js';
import { startMenuManager } from './startMenuManager.js';
import { clockManager } from './clockManager.js';

const windowManager = new WindowManager();
const startMenu = startMenuManager();
clockManager();

window.getAccent = function (rgbaInput) {
  const taskbar = window.parent.document.getElementById("taskbar");
  if (!taskbar) return rgbaInput;

  const taskbarColor = window.parent.getComputedStyle(taskbar).backgroundColor;

  const inputMatch = rgbaInput.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
  const alpha = inputMatch?.[4];

  if (!alpha) {
    console.warn("Alpha not found in input:", rgbaInput);
    return rgbaInput;
  }

  const taskbarMatch = taskbarColor.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  const rgb = taskbarMatch ? `${taskbarMatch[1]}, ${taskbarMatch[2]}, ${taskbarMatch[3]}` : "0,0,0";

  return `rgba(${rgb}, ${alpha})`;
};

const params = new URLSearchParams(window.location.search);
if (params.get('dev') === 'true') {

  function addDevIcons() {
    const desktopIcons = document.getElementById('desktop-icons');
    if (!desktopIcons) return false;

    const devIconsHTML = `
      <div id="desktop-user-icons">
        <div class="desktop-icon" data-title="RUN..." data-url="" data-width="782" data-height="472">
          <img src="./icons/run.png"/>
        </div>
      </div>
    `;

    desktopIcons.insertAdjacentHTML('afterend', devIconsHTML);
    console.log('Dev icons added!');

    const runIcon = document.querySelector('#desktop-user-icons .desktop-icon[data-title="RUN..."]');
    if (runIcon) {
      runIcon.addEventListener('dblclick', () => {
        let runURL = prompt("URL", "");
        windowManager.createWindow({
          title: `DEV`,
          content: `<iframe src="${runURL}" width="100%" height="100%" style="border:none;"></iframe>`,
          x: 200,
          y: 150,
          width: 800,
          height: 600
        });
      });
    }

    return true;
  }

  if (!addDevIcons()) {
    const observer = new MutationObserver(() => {
      if (addDevIcons()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
}

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

/* windowManager.createWindow({
  title: 'Welcome',
  content: `<iframe src="./applications/welcome.html" width="100%" height="100%" style="border:none;"></iframe>`,
  x: 100,
  y: 100,
  width: 800,
  height: 600
}); */

window.addEventListener("message", (event) => {
  if (event.data?.type === "term") {
    const iframe = document.getElementById("window_terminal");
    iframe.contentWindow.postMessage(event.data, "*");
  }
  else if (event.data.type === "getAccent") {
    const values = [
      getAccent("rgba(255, 107, 107, 0.35)"),
      getAccent("rgba(255, 107, 107, 1)")
    ];
    event.source.postMessage({ type: "accentResponse", values }, "*");
  }
});

document.querySelectorAll('.desktop-icon').forEach(icon => {
  const title = icon.getAttribute('data-title');
  const span = document.createElement('span');
  span.textContent = title;
  icon.appendChild(span);

  const eventName = new URLSearchParams(location.search).get("icon") || "dblclick";
  icon.addEventListener(eventName, (e) => {
    const title = icon.getAttribute('data-title');
    const url = icon.getAttribute('data-url');
    const width = icon.getAttribute('data-width');
    const height = icon.getAttribute('data-height');
    const betaUrl = `beta${url.replace(/^\./, '')}`;

    const id = 'window_' + title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]+/g, '_')
      .replace(/^([^a-z])/, '_$1');

    if (e.shiftKey) {
      windowManager.createWindow({
        title: title,
        content: `<iframe src="${betaUrl}" id="${id}" width="100%" height="100%" style="border:none;" allowtransparency="true"></iframe>`,
        x: 200,
        y: 150,
        width: width,
        height: height
      });
    } else {
      windowManager.createWindow({
        title: title,
        content: `<iframe src="${url}" id="${id}" width="100%" height="100%" style="border:none;" allowtransparency="true"></iframe>`,
        x: 200,
        y: 150,
        width: width,
        height: height
      });
    }
    if (title == "Doom") {
      windowManager.createWindow({
        title: "Terminal [Doom]",
        content: `<iframe src="./applications/doom/term.html" id="window_terminal" width="100%" height="100%" style="border:none;" allowtransparency="true"></iframe>`,
        x: 200,
        y: 150,
        width: width,
        height: height
      });
    }
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