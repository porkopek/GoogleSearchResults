@echo off
echo Building Google Search Results Counter extension...

REM Read current version from manifest.json using PowerShell
for /f "tokens=*" %%i in ('powershell -command "(Get-Content manifest.json | ConvertFrom-Json).version"') do set CURRENT_VERSION=%%i

REM Increment patch version using PowerShell
for /f "tokens=*" %%i in ('powershell -command "$v='%CURRENT_VERSION%'; $parts=$v.Split('.'); $parts[2]=[int]$parts[2]+1; $parts -join '.'"') do set NEW_VERSION=%%i

echo Current version: %CURRENT_VERSION%
echo New version: %NEW_VERSION%

REM Update version in manifest.json using PowerShell
powershell -command "(Get-Content manifest.json | ConvertFrom-Json | ForEach-Object { $_.version = '%NEW_VERSION%'; $_ } | ConvertTo-Json -Depth 10) | Set-Content manifest.json"

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

REM Create submission package using PowerShell with new version
echo Creating ZIP package...
powershell -command "Compress-Archive -Path 'build\*' -DestinationPath 'google-search-results-counter-v%NEW_VERSION%.zip' -Force"

echo.
echo ✅ Build complete!
echo 📦 Submission package: google-search-results-counter-v%NEW_VERSION%.zip
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
echo 3. Upload google-search-results-counter-v%NEW_VERSION%.zip to Chrome Web Store
pause
