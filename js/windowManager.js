export class WindowManager {
  constructor() {
    this.windows = new Map();
    this.activeWindow = null;
    this.windowIdCounter = 0;
    this.taskList = window.parent.document.getElementById('task-list');
  }

  createWindow({ title, icon, content, x, y, width, height }) {
    const id = this.windowIdCounter++;
    
    const windowEl = window.parent.document.createElement('div');
    windowEl.className = 'window';
    windowEl.style.width = `${width}px`;
    windowEl.style.height = `${height}px`;
    windowEl.style.left = `${x}px`;
    windowEl.style.top = `${y}px`;
    
    const header = window.parent.document.createElement('div');
    header.className = 'window-header';
    
    const titleEl = window.parent.document.createElement('div');
    titleEl.className = 'window-title';
    titleEl.textContent = title;
    
    const controls = window.parent.document.createElement('div');
    controls.className = 'window-controls';

    const maximizeBtn = this.createWindowButton('➖');
    const minimizeBtn = this.createWindowButton(`➕`);
    let closeBtn = this.createWindowButton(`❌`)

    controls.append(maximizeBtn, minimizeBtn);
    if (icon) {
    closeBtn = this.createWindowIcon(icon);
    }
    header.append(closeBtn, titleEl, controls);

    const contentEl = window.parent.document.createElement('div');
    contentEl.className = 'window-content';
    contentEl.innerHTML = content;
    
    windowEl.append(header, contentEl);
    window.parent.document.getElementById('windows').appendChild(windowEl);
    
    const taskButton = window.parent.document.createElement('button');
    taskButton.className = 'task-button';
    taskButton.textContent = title;
    this.taskList.appendChild(taskButton);
    
    // Store window data
    const windowData = {
      element: windowEl,
      taskButton,
      title,
      isMinimized: false
    };
    
    this.windows.set(id, windowData);
    
    this.setupWindowEvents(id, windowEl, header);
    this.setupTaskButtonEvents(id, taskButton);
    this.setupWindowControls(id, closeBtn, minimizeBtn, maximizeBtn);
    
    this.activateWindow(id);
    
    return id;
  }

  setupWindowEvents(id, windowEl, header) {
    let mouseDown = false;
    let clickDifferenceX = 0;
    let clickDifferenceY = 0;
  
    windowEl.addEventListener('mousedown', () => this.activateWindow(id));
  
    header.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Only handle left-clicks
      mouseDown = true;
      e.preventDefault();
      const rect = windowEl.getBoundingClientRect();
      clickDifferenceX = e.clientX - rect.left;
      clickDifferenceY = e.clientY - rect.top;
    });
   
    header.addEventListener('dblclick', () => this.maximizeWindow(id));

  
    window.parent.document.addEventListener('mousemove', (e) => {
      if (!mouseDown) return;
      e.preventDefault();
      windowEl.style.left = `${e.clientX - clickDifferenceX}px`;
      windowEl.style.top = `${e.clientY - clickDifferenceY}px`;
    });
  
    window.parent.document.addEventListener('mouseup', () => {
      if (!mouseDown) return;
      mouseDown = false;
    });
  }  

  setupTaskButtonEvents(id, taskButton) {
    taskButton.addEventListener('click', () => {
      const win = this.windows.get(id);
      if (win.isMinimized) {
        this.restoreWindow(id);
      } else if (this.activeWindow === id) {
        this.minimizeWindow(id);
      } else {
        this.activateWindow(id);
      }
    });
  }

  setupWindowControls(id, Btn1, Btn2, Btn3) {
    Btn2.addEventListener('click', () => this.maximizeWindow(id));
    Btn3.addEventListener('click', () => this.minimizeWindow(id));
    Btn1.addEventListener('dblclick', () => this.closeWindow(id));
  }

  createWindowButton(text) {
    const button = window.parent.document.createElement('button');
    button.className = 'window-button';
    button.textContent = text;
    return button;
  }
  createWindowIcon(text) {
    const button = window.parent.document.createElement('button');
    button.className = 'window-button';
    const image = window.parent.document.createElement('img');
    image.className = 'window-icon';
    image.src = text;  
    button.appendChild(image);  
    return button;
  }
  

  activateWindow(id) {
    this.windows.forEach((win, winId) => {
      if (winId === id) {
        win.element.style.zIndex = '100';
        win.taskButton.classList.add('active');
      } else {
        win.element.style.zIndex = '1';
        win.taskButton.classList.remove('active');
      }
    });
    this.activeWindow = id;
  }

  minimizeWindow(id) {
    const win = this.windows.get(id);
    win.element.style.display = 'none';
    win.isMinimized = true;
    win.taskButton.classList.remove('active');
  }

  restoreWindow(id) {
    const win = this.windows.get(id);
    win.element.style.display = 'flex';
    win.isMinimized = false;
    this.activateWindow(id);
  }

  maximizeWindow(id) {
    const win = this.windows.get(id);
    const isMaximized = win.element.style.width === '100vw';
    
    if (isMaximized) {
      win.element.style.width = win.prevWidth || '400px';
      win.element.style.height = win.prevHeight || '300px';
      win.element.style.left = win.prevLeft || '0px';
      win.element.style.top = win.prevTop || '0px';
    } else {
      win.prevWidth = win.element.style.width;
      win.prevHeight = win.element.style.height;
      win.prevLeft = win.element.style.left;
      win.prevTop = win.element.style.top;
      
      win.element.style.width = '100vw';
      win.element.style.height = `calc(100vh - var(--taskbar-height))`;
      win.element.style.left = '0';
      win.element.style.top = '0';
    }
  }

  closeWindow(id) {
    const win = this.windows.get(id);
    win.element.remove();
    win.taskButton.remove();
    this.windows.delete(id);
  }
}