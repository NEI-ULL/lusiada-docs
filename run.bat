@echo off
if not exist "%~dp0node_modules/" call npm install
node server.js
