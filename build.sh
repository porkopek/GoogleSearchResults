#!/bin/bash

# Build script for Google Search Results Counter Chrome Extension
# This script creates a clean build ready for Chrome Web Store submission

echo "Building Google Search Results Counter extension..."

# Read current version from manifest.json
CURRENT_VERSION=$(grep '"version"' manifest.json | sed 's/.*"version": "\([^"]*\)".*/\1/')

# Increment patch version (e.g., 1.0.1 -> 1.0.2)
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"
NEW_PATCH=$((PATCH + 1))
NEW_VERSION="${MAJOR}.${MINOR}.${NEW_PATCH}"

echo "Current version: $CURRENT_VERSION"
echo "New version: $NEW_VERSION"

# Update version in manifest.json
sed -i "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" manifest.json

# Create build directory
mkdir -p build

# Copy essential files
cp manifest.json build/
cp content.js build/
cp README.md build/
cp PRIVACY_POLICY.md build/

# Copy icons directory
cp -r icons build/

# Create submission package with new version
cd build
zip -r ../google-search-results-counter-v${NEW_VERSION}.zip .
cd ..

echo "✅ Build complete!"
echo "📦 Submission package: google-search-results-counter-v${NEW_VERSION}.zip"
echo "📋 Files included:"
echo "   - manifest.json"
echo "   - content.js"
echo "   - README.md"
echo "   - PRIVACY_POLICY.md"
echo "   - icons/ (directory)"
echo ""
echo "🚀 Ready for Chrome Web Store submission!"
echo ""
echo "Next steps:"
echo "1. Create proper PNG icons (16x16, 32x32, 48x48, 128x128)"
echo "2. Take screenshots for store listing"
echo "3. Upload google-search-results-counter-v${NEW_VERSION}.zip to Chrome Web Store"
