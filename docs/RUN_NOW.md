# CommunityHub - ONE COMMAND TO RUN

Copy and paste this into your terminal:

```bash
cd /Users/modanbaron/CommunityHub/CommunityHub && chmod +x install-and-run.sh && ./install-and-run.sh
```

That's it! Everything will be installed and started automatically.

---

## Alternative Commands

### If you're already in the project directory:

```bash
chmod +x install-and-run.sh && ./install-and-run.sh
```

### Using make:

```bash
make all
```

### Using npm:

```bash
npm run setup && npm run dev
```

### Manual (step by step):

```bash
npm install
cd client && npm install && cd ..
cp .env.example .env
brew services start mongodb-community
npm run dev
```

---

## After Running

Open in your browser:
- **http://localhost:3000** - The app
- **http://localhost:5000/api/health** - API health check

---

## Need Help?

Read:
- `HEBREW_README.md` - מדריך מלא בעברית
- `START_HERE.md` - Quick start in English
- `HOW_TO_RUN.txt` - Complete run instructions
