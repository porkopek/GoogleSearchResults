// Content script for Google Results Stats Display
// This script captures the text from #result-stats and displays it in a custom yellow box

console.log('Google Results Stats Display: Content script loaded');

let customStatsDisplay = null;

function createCustomStatsDisplay() {
  // Create the custom display element
  const statsBox = document.createElement('div');
  statsBox.id = 'custom-result-stats';

  // Apply styles for the yellow box in top-right corner
  statsBox.style.cssText = `
        background: yellow;
        position: fixed;
        right: 0px;
        top: 0px;
        font-size: 18px;
        padding: 5px 6px 5px 12px;
        border-radius: 7px;
        z-index: 99999;
        border: 1px solid #ccc;
        font-family: arial, sans-serif;
        color: #333;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        max-width: 300px;
        word-wrap: break-word;
    `;

  // Add to page
  document.body.appendChild(statsBox);
  customStatsDisplay = statsBox;

  console.log('Custom stats display created');
  return statsBox;
}

function updateStatsDisplay() {
  // Find the original result-stats element
  const originalStats = document.querySelector('#result-stats');

  if (originalStats && customStatsDisplay) {
    const statsText = originalStats.textContent.trim();
    if (statsText) {
      customStatsDisplay.textContent = statsText;
      customStatsDisplay.style.display = 'block';
      console.log('Stats updated:', statsText);
    }
  } else if (customStatsDisplay) {
    // Hide if no stats found
    customStatsDisplay.style.display = 'none';
  }
}

function initializeStatsCapture() {
  // Create the custom display
  createCustomStatsDisplay();

  // Initial update
  updateStatsDisplay();

  // Set up observer to watch for changes (for when user performs new searches)
  const observer = new MutationObserver(() => {
    updateStatsDisplay();
  });

  // Observe changes to the entire document
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeStatsCapture);
} else {
  initializeStatsCapture();
}
