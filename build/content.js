// Google Search Results Display Extension
// Displays Google search result count in a draggable yellow box

let statsBox = null;

function savePosition(x, y) {
  chrome.storage.local.set({
    statsBoxPosition: { x: x, y: y },
  });
}

function loadPosition(callback) {
  chrome.storage.local.get(['statsBoxPosition'], result => {
    if (result.statsBoxPosition) {
      callback(result.statsBoxPosition.x, result.statsBoxPosition.y);
    } else {
      callback(null, null);
    }
  });
}

function makeDraggable(element) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  element.style.cursor = 'move';
  element.style.userSelect = 'none';

  element.addEventListener('mousedown', e => {
    isDragging = true;
    const rect = element.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    document.body.style.cursor = 'move';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;

    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;
    const maxX = window.innerWidth - element.offsetWidth;
    const maxY = window.innerHeight - element.offsetHeight;
    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));

    element.style.left = constrainedX + 'px';
    element.style.top = constrainedY + 'px';
    element.style.right = 'auto';
    e.preventDefault();
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.cursor = 'auto';
      const rect = element.getBoundingClientRect();
      savePosition(rect.left, rect.top);
    }
  });
}

function createStatsBox(text) {
  if (statsBox) {
    statsBox.remove();
    statsBox = null;
  }

  const box = document.createElement('div');
  box.textContent = text;
  box.id = 'google-results-stats-box';
  box.style.cssText = `
    background: #ffeb3b;
    position: fixed;
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 6px;
    z-index: 99999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    color: #333;
    cursor: move;
    user-select: none;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    font-weight: 500;
    white-space: nowrap;
  `;

  loadPosition((savedX, savedY) => {
    if (savedX !== null && savedY !== null) {
      box.style.left = savedX + 'px';
      box.style.top = savedY + 'px';
      box.style.right = 'auto';
    } else {
      box.style.right = '10px';
      box.style.top = '10px';
    }
  });

  makeDraggable(box);
  document.body.appendChild(box);
  statsBox = box;
}

function getStatsElement() {
  const selector = '#result-stats';

  const element = document.querySelector(selector);
  if (element && element.textContent.trim()) {
    return element;
  }
}

function captureResultStats(attempt = 1) {
  if (statsBox) return;

  const resultStats = getStatsElement();

  if (!resultStats) {
    // Retry up to 5 times with increasing delays
    if (attempt <= 5) {
      setTimeout(() => {
        captureResultStats(attempt + 1);
      }, attempt * 500); // 500ms, 1s, 1.5s, 2s, etc.
    }
    return;
  }

  const statsText = resultStats.textContent.trim();
  if (statsText) {
    const cleanText = statsText
      .replace(/About\s*/i, '')
      .replace(/\s*\([^)]*\)/g, '')
      .trim();

    if (cleanText && (cleanText.includes('result') || /\d/.test(cleanText))) {
      createStatsBox(cleanText);
    }
  }
}

function initializeExtension() {
  captureResultStats();

  setTimeout(() => captureResultStats(), 1000);

  // Watch for dynamic changes
  const observer = new MutationObserver(() => {
    if (!statsBox) {
      captureResultStats();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  setTimeout(() => observer.disconnect(), 5000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}
