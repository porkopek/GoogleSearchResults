#!/bin/bash

# Build script for Google Search Results Counter Chrome Extension
# This script creates a clean build ready for Chrome Web Store submission

echo "Building Google Search Results Counter extension..."

# Create build directory
mkdir -p build

# Copy essential files
cp manifest.json build/
cp content.js build/
cp README.md build/
cp PRIVACY_POLICY.md build/

# Copy icons directory
cp -r icons build/

# Create submission package
cd build
zip -r ../google-search-results-counter-v1.0.0.zip .
cd ..

echo "✅ Build complete!"
echo "📦 Submission package: google-search-results-counter-v1.0.0.zip"
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
echo "3. Upload google-search-results-counter-v1.0.0.zip to Chrome Web Store"
