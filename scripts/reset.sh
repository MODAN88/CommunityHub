#!/bin/bash

# CommunityHub - Complete Reset for Development
# This script resets the database and cache to start fresh

echo "🔄 CommunityHub - Complete Reset"
echo ""
echo "⚠️  This will DELETE all data from MongoDB and Redis"
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

echo ""
echo "1️⃣  Stopping servers..."
pkill -f "node.*server/index.js" 2>/dev/null
pkill -f "react-scripts" 2>/dev/null
sleep 2

echo "2️⃣  Clearing MongoDB..."
mongosh communityhub --eval "db.dropDatabase()" --quiet
echo "   ✅ Database cleared"

echo "3️⃣  Clearing Redis cache..."
redis-cli FLUSHDB 2>/dev/null && echo "   ✅ Cache cleared" || echo "   ⚠️  Redis not running"

echo ""
echo "4️⃣  Verifying database is empty..."
mongosh communityhub --eval "db.getCollectionNames().length === 0 ? print('✅ Database is empty') : print('⚠️ Collections still exist')" --quiet

echo ""
echo "✨ Reset complete! Run 'npm run dev' to start fresh."
