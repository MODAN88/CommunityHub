#!/bin/bash

# Reset CommunityHub Database
# This script clears all data from MongoDB

echo "🗑️  Resetting CommunityHub Database..."
echo ""

# Drop the database
mongosh communityhub --eval "db.dropDatabase()" --quiet

if [ $? -eq 0 ]; then
    echo "✅ Database reset successfully"
    echo ""
    echo "Next steps:"
    echo "1. Clear browser localStorage: localStorage.clear() in Console"
    echo "2. Restart server: npm run dev"
    echo "3. Register a new user"
else
    echo "❌ Failed to reset database"
    echo "Make sure MongoDB is running: brew services start mongodb-community@7.0"
    exit 1
fi
