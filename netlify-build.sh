#!/bin/bash

# Echo commands
set -ex

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf .next out

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building Next.js app..."
npm run build

# Check build output
echo "Checking build output..."
ls -la out/

echo "Build completed successfully!" 