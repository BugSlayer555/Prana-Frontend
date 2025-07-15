#!/bin/bash
set -e

# Fix permissions
# chmod +x node_modules/.bin/react-scripts

# Install dependencies if needed
npm install

# Build the project
npm run build 