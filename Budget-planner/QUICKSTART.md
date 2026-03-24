# Quick Start Guide - Budget Planner with Feedback

## Overview
Your Budget Planner now has a feedback system that:
- ✅ Saves feedback to MongoDB database
- ✅ Creates GitHub Issues automatically
- ✅ Displays feedback on your website
- ✅ Stores email and timestamps

## Files in Your Project

```
budget/
├── budget.html              ← Your website (open this in browser)
├── server.js                ← Backend API server
├── package.json             ← Project dependencies
├── .env                     ← Your configuration (keep private!)
├── test-db-connection.js    ← Test your database connection
├── MONGODB_SETUP.md         ← Detailed MongoDB setup instructions
├── README.md                ← Full documentation
└── .gitignore               ← Prevents .env from being committed
```

## Quick Start (5 mins)

### 1️⃣ Set Up MongoDB Atlas (2 mins)

Follow [MONGODB_SETUP.md](MONGODB_SETUP.md) - Step by step guide:
- Create free MongoDB Atlas account
- Create a cluster
- Create a database user
- Get your connection string
- Update `.env` file with the connection string

### 2️⃣ Install Dependencies (1 min)

Open PowerShell in your budget folder and run:

```powershell
npm install
```

### 3️⃣ Test Database Connection (1 min)

```powershell
npm run test-db
```

You should see:
```
✅ MongoDB connected successfully!
✅ Write test successful!
✅ Read test successful!
✅ ALL TESTS PASSED!
```

If tests fail, check [MONGODB_SETUP.md](MONGODB_SETUP.md) troubleshooting section.

### 4️⃣ Start Your Server (1 min)

```powershell
npm start
```

You should see:
```
MongoDB connected
Server running on port 5000
```

### 5️⃣ Open Your Website

1. Open `budget.html` in your web browser
2. Try submitting feedback
3. Feedback should appear in the list below
4. Check MongoDB Atlas to see the data saved

## Configuration (.env File)

Your `.env` file contains:

```properties
# Your MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster...

# GitHub settings (optional)
GITHUB_TOKEN=your_token
GITHUB_REPO_OWNER=your_username
GITHUB_REPO_NAME=your_repo
```

⚠️ **IMPORTANT:**
- Never share your `.env` file
- Never commit it to GitHub (it's in .gitignore)
- Keep your passwords and tokens private

## Testing Feedback

1. Open `budget.html` in browser
2. Enter an allowance amount and click "Calculate Budget"
3. Enter feedback text and click "Add Feedback"
4. Feedback appears in green box below
5. Check MongoDB Atlas to confirm it's saved:
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Click your cluster → Collections
   - Look in `feedbacks` collection

## Troubleshooting

### "Cannot connect to server"
- Make sure `npm start` is running in PowerShell
- Keep that PowerShell window open while using the website

### "MongoDB connection error"
- Run `npm run test-db` to test your connection
- Check `.env` file has correct MONGODB_URI
- Verify username and password are correct

### "Port 5000 already in use"
- Another app is using port 5000
- Kill the other process or use different port in `.env`

### Still having issues?
- Read [MONGODB_SETUP.md](MONGODB_SETUP.md) detailed section
- Check [README.md](README.md) for more info

## Next Steps

After confirming databases works:

1. **Add GitHub Integration** (optional)
   - Get GitHub token from settings
   - Update GITHUB_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME in `.env`
   - Feedback will now create GitHub Issues

2. **Deploy to Production** (optional)
   - Use Vercel, Heroku, or another hosting service
   - MongoDB Atlas is already cloud-hosted
   - See [README.md](README.md) for deployment options

3. **Customize Styling**
   - Edit `budget.html` to change colors, fonts, layout
   - Add more features as needed

## Need Help?

- **MongoDB Setup?** → Read [MONGODB_SETUP.md](MONGODB_SETUP.md)
- **Full Documentation?** → Read [README.md](README.md)
- **Server Details?** → Check comments in `server.js`
- **Frontend Code?** → Check script tags in `budget.html`

### Common Commands

```powershell
# Install dependencies (run once)
npm install

# Start the server
npm start

# Test database connection
npm run test-db

# Stop the server
Ctrl + C

# Check Node version
node --version

# Check npm version
npm --version
```

## You're All Set! 🎉

Your feedback system is completely set up and ready to receive feedback from users. Enjoy!
