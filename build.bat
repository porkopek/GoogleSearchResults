@echo off
echo Building Google Search Results Counter extension...

REM Create build directory
if exist build rmdir /s /q build
mkdir build

REM Copy essential files
copy manifest.json build\
copy content.js build\
copy README.md build\
copy PRIVACY_POLICY.md build\

REM Copy icons directory
xcopy icons build\icons\ /E /I

REM Create submission package using PowerShell
echo Creating ZIP package...
powershell -command "Compress-Archive -Path 'build\*' -DestinationPath 'google-search-results-counter-v1.0.0.zip' -Force"

echo.
echo ✅ Build complete!
echo 📦 Submission package: google-search-results-counter-v1.0.0.zip
echo 📋 Files included:
echo    - manifest.json
echo    - content.js
echo    - README.md
echo    - PRIVACY_POLICY.md
echo    - icons/ (directory)
echo.
echo 🚀 Ready for Chrome Web Store submission!
echo.
echo Next steps:
echo 1. Create proper PNG icons (16x16, 32x32, 48x48, 128x128)
echo 2. Take screenshots for store listing
echo 3. Upload google-search-results-counter-v1.0.0.zip to Chrome Web Store
pause
