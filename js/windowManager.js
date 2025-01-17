export class WindowManager {
  constructor() {
    this.windows = new Map();
    this.activeWindow = null;
    this.windowIdCounter = 0;
    this.taskList = document.getElementById('task-list');
  }

  createWindow({ title, content, x, y, width, height }) {
    const id = this.windowIdCounter++;
    
    // Create window element
    const windowEl = document.createElement('div');
    windowEl.className = 'window';
    windowEl.style.width = `${width}px`;
    windowEl.style.height = `${height}px`;
    windowEl.style.left = `${x}px`;
    windowEl.style.top = `${y}px`;
    
    // Create window header
    const header = document.createElement('div');
    header.className = 'window-header';
    
    const titleEl = document.createElement('div');
    titleEl.className = 'window-title';
    titleEl.textContent = title;
    
    const controls = document.createElement('div');
    controls.className = 'window-controls';
    
    const minimizeBtn = this.createWindowButton('_');
    const maximizeBtn = this.createWindowButton('+');
    const closeBtn = this.createWindowButton('X');
    
    controls.append(maximizeBtn, minimizeBtn);
    header.append(closeBtn, titleEl, controls);
    
    // Create window content
    const contentEl = document.createElement('div');
    contentEl.className = 'window-content';
    contentEl.innerHTML = content;
    
    windowEl.append(header, contentEl);
    document.getElementById('windows').appendChild(windowEl);
    
    // Create taskbar button
    const taskButton = document.createElement('button');
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
    
    // Setup event listeners
    this.setupWindowEvents(id, windowEl, header);
    this.setupTaskButtonEvents(id, taskButton);
    this.setupWindowControls(id, closeBtn, maximizeBtn, minimizeBtn);
    
    this.activateWindow(id);
    
    return id;
  }

  setupWindowEvents(id, windowEl, header) {
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };

    windowEl.addEventListener('mousedown', () => this.activateWindow(id));

    header.addEventListener('mousedown', (e) => {
      isDragging = true;
      const rect = windowEl.getBoundingClientRect();
      dragOffset.x = e.clientX - rect.left;
      dragOffset.y = e.clientY - rect.top;
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        windowEl.style.left = `${e.clientX - dragOffset.x}px`;
        windowEl.style.top = `${e.clientY - dragOffset.y}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
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
    Btn3.addEventListener('click', () => this.minimizeWindow(id));
    Btn2.addEventListener('click', () => this.maximizeWindow(id));
    Btn1.addEventListener('click', () => this.closeWindow(id));
  }

  createWindowButton(text) {
    const button = document.createElement('button');
    button.className = 'window-button';
    button.style.backgroundImage = `text`;
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