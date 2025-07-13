# Google Results Stats Display

A Chrome extension (Manifest V3) that captures the text content from Google's result stats and displays it in a custom yellow box in the top-right corner.

## Features

- Automatically captures text from the `#result-stats` element on Google search pages
- Displays the stats in a custom yellow box positioned in the top-right corner
- Uses Manifest V3 for modern Chrome extension compatibility
- Lightweight and efficient with real-time updates

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" by toggling the switch in the top right corner
3. Click "Load unpacked" button
4. Select the folder containing this extension (the folder with `manifest.json`)
5. The extension will be installed and activated automatically

## Files

- `manifest.json` - Extension configuration and permissions
- `content.js` - Content script that captures and displays the result stats
- `README.md` - This documentation file

## How it works

The extension uses Chrome's content scripts feature to:

1. Find the `#result-stats` element on Google search pages
2. Extract its text content (e.g., "About 1,234,567 results (0.45 seconds)")
3. Display this text in a custom yellow box positioned in the top-right corner
4. Continuously monitor for changes to update the display in real-time

The custom display box features:

- Yellow background
- Fixed position in top-right corner
- Readable font and styling
- Automatic text wrapping for long content
- High z-index to stay on top

## Customization

To modify the appearance of the stats display:

1. Edit the `content.js` file and modify the `statsBox.style.cssText` section
2. Reload the extension in `chrome://extensions/` by clicking the refresh icon
3. Refresh any open Google search pages to see the changes

## Permissions

- `activeTab` - Allows the extension to access the current active tab when triggered
- Content scripts are limited to Google search pages only for security

## Browser Compatibility

- Chrome (Manifest V3)
- Other Chromium-based browsers that support Manifest V3
