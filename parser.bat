@ECHO off
SET url=%1
FOR /F "tokens=* USEBACKQ" %%F IN (`node parser.js %url%`) DO (
SET var=%%F
)
ECHO %var%