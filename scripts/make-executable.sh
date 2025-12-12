#!/bin/bash

# Make all scripts executable
chmod +x setup.sh
chmod +x install-and-run.sh
chmod +x run.sh

echo "✅ All scripts are now executable!"
echo ""
echo "You can now run:"
echo "  ./install-and-run.sh  - Complete setup and run"
echo "  ./run.sh              - Quick run (if already installed)"
echo "  ./setup.sh            - Setup with prompts"
echo ""
echo "Or use:"
echo "  make all              - Setup and run with Makefile"
echo "  npm run dev           - Run directly with npm"
