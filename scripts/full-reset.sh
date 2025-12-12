#!/bin/bash

echo "🔧 CommunityHub - Complete Reset & Restart"
echo ""

# 1. Stop any running servers
echo "1️⃣  Stopping servers..."
pkill -f "node.*server/index.js" 2>/dev/null
pkill -f "react-scripts" 2>/dev/null
sleep 2

# 2. Clear MongoDB
echo "2️⃣  Clearing MongoDB..."
mongosh communityhub --eval "db.dropDatabase()" --quiet

# 3. Clear Redis cache
echo "3️⃣  Clearing Redis cache..."
redis-cli FLUSHDB 2>/dev/null || echo "   ⚠️  Redis not running or not installed"

# 4. Check MongoDB data
echo ""
echo "4️⃣  Checking MongoDB..."
mongosh communityhub --eval "db.users.countDocuments()" --quiet | grep -q "0" && echo "   ✅ Users: 0" || echo "   ⚠️  Users exist"
mongosh communityhub --eval "db.events.countDocuments()" --quiet | grep -q "0" && echo "   ✅ Events: 0" || echo "   ⚠️  Events exist"

echo ""
echo "✅ Reset complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Start servers: npm run dev"
echo "   2. In browser console: localStorage.clear(); location.reload()"
echo "   3. Register new user"
echo "   4. Create event"
echo ""
