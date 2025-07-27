@ECHO OFF


CALL npm run build

@misc\jsmin\jsmin <dist\suica.js >dist\suica.min.js
@copy dist\suica.min.js examples\suica.js
@REM @copy dist\suica.min2.js examples\suica.js

@echo.
@echo.


@cd dist
@echo --------------------------------------
SETLOCAL enabledelayedexpansion
Set "MyFile=*.js"
for %%A in ("%MyFile%") do (
	set "Size=%%~zA"
	echo !size!	%%A	
)
@echo --------------------------------------
@echo.
@echo.
@cd ..

pause
