# Setup Checklist

Complete these steps in order to get your feedback system working with MongoDB:

## ✅ Prerequisites
- [ ] Node.js installed (download from nodejs.org)
- [ ] PowerShell or Command Prompt available
- [ ] GitHub account (for GitHub integration)
- [ ] Internet connection
- [ ] 15 minutes of time

---

## Database Setup

### Step 1: MongoDB Atlas Account
- [ ] Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Click "Sign Up"
- [ ] Create account with your email
- [ ] Verify email address
- [ ] Sign in to MongoDB Atlas

### Step 2: Create Project & Cluster
- [ ] Click "Create a Project"
- [ ] Name: `budget-planner` (or your choice)
- [ ] Click "Create Project"
- [ ] Click "Create a Cluster"
- [ ] Select "M0 Free" tier
- [ ] Choose a region (USA recommended)
- [ ] Cluster name: `budget-cluster` (or your choice)
- [ ] Click "Create Deployment"
- [ ] **⏳ Wait 1-2 minutes for cluster to create**

### Step 3: Create Database User
- [ ] Left menu → "Database Access"
- [ ] Click "Add New Database User"
- [ ] Username: `budgetuser`
- [ ] Password: Generate or create one (⭐ **SAVE THIS!**)
- [ ] Roles: Select "readWriteAnyDatabase"
- [ ] Click "Add User"

### Step 4: Network Access
- [ ] Left menu → "Network Access"
- [ ] Click "Add IP Address"
- [ ] Click "Allow Access from Anywhere" (or add your IP)
- [ ] Confirm

### Step 5: Get Connection String
- [ ] Go back to "Database" section
- [ ] Click "Connect" on your cluster
- [ ] Click "Drivers"
- [ ] Select "Node.js" (4.x or higher)
- [ ] **Copy the connection string**
  - Format: `mongodb+srv://budgetuser:PASSWORD@...`
  - **Replace `<password>` with your actual password from Step 3**

---

## Local Setup

### Step 6: Check Node.js Installation
- [ ] Open PowerShell
- [ ] Run: `node --version`
- [ ] Should show version like "v18.x.x"
- [ ] Run: `npm --version`
- [ ] Should show npm version

### Step 7: Install Project Dependencies
- [ ] Open PowerShell in your budget folder
- [ ] Run: `npm install`
- [ ] Wait for it to finish (shows "added XXX packages")

### Step 8: Create .env File
- [ ] Open `.env` file in your budget folder
- [ ] Update MONGODB_URI with your connection string from Step 5:
  ```
  MONGODB_URI=mongodb+srv://budgetuser:YOUR_PASSWORD@your-cluster-id.mongodb.net/budget-planner?retryWrites=true&w=majority
  ```
- [ ] Update GitHub settings (optional):
  - [ ] GITHUB_TOKEN: Get from github.com/settings/tokens
  - [ ] GITHUB_REPO_OWNER: Your GitHub username
  - [ ] GITHUB_REPO_NAME: Where you want issues created
- [ ] Save the file

### Step 9: Test Database Connection
- [ ] Open PowerShell in budget folder
- [ ] Run: `npm run test-db`
- [ ] Look for: ✅ **ALL TESTS PASSED!**
- [ ] If failed, go to Troubleshooting section below

### Step 10: Start the Server
- [ ] PowerShell still in budget folder
- [ ] Run: `npm start`
- [ ] Should see:
  ```
  MongoDB connected
  Server running on port 5000
  ```
- [ ] **Keep this PowerShell window open** while using the website
- [ ] To stop: Press `Ctrl + C`

---

## Test Your Setup

### Step 11: Open Your Website
- [ ] Open `budget.html` in your web browser
- [ ] Should see "Monthly Budget Planner" page
- [ ] If connection error appears, server may not be running (Step 10)

### Step 12: Test Feedback System
- [ ] Enter a number in "Enter Monthly Allowance" (e.g., 10000)
- [ ] Click "Calculate Budget"
- [ ] You should see the 50-30-20 breakdown
- [ ] Scroll down to Feedback section
- [ ] (Optional) Enter your email
- [ ] Type some test feedback
- [ ] Click "Add Feedback"
- [ ] Feedback appears in list below

### Step 13: Verify in MongoDB
- [ ] Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Click your cluster
- [ ] Click "Collections"
- [ ] Find `budget-planner` database
- [ ] Click `feedbacks` collection
- [ ] You should see your feedback entry with timestamp
- [ ] ✅ **Database is working!**

---

## Optional: GitHub Integration

### Step 14: Set Up GitHub Token
- [ ] Go to github.com/settings/tokens
- [ ] Click "Generate new token" → "Generate new token (classic)"
- [ ] Note: `budget-planner-token`
- [ ] Scopes: Check ✅ `repo` and ✅ `public_repo`
- [ ] Click "Generate token"
- [ ] **Copy the token** (you won't see it again!)
- [ ] In `.env` file, update:
  ```
  GITHUB_TOKEN=ghp_your_token_here
  GITHUB_REPO_OWNER=your_github_username
  GITHUB_REPO_NAME=your_repository_name
  ```
- [ ] Restart server: Ctrl+C then `npm start`
- [ ] Submit feedback - should now create GitHub Issues

---

## Troubleshooting

### ❌ "MongoDB connection error"
- [ ] Verify MONGODB_URI in `.env` is complete and correct
- [ ] Confirm password has correct special characters
- [ ] Check username is `budgetuser` (or whatever you created)
- [ ] Ensure cluster name is correct in connection string
- [ ] Wait 5 minutes - cluster might not be fully ready
- [ ] Run `npm run test-db` again

### ❌ "Connection refused"
- [ ] Make sure PowerShell window running `npm start` is still open
- [ ] Check that server shows "Server running on port 5000"
- [ ] Try refreshing browser (Ctrl+R)

### ❌ "IP Access error"
- [ ] Go to MongoDB Atlas → Network Access
- [ ] Make sure you added IP address or "Allow Access from Anywhere"
- [ ] Wait 1-2 minutes for changes to apply

### ❌ "Port 5000 already in use"
- [ ] Another app is using port 5000
- [ ] Press Ctrl+C to stop current server
- [ ] Wait 10 seconds
- [ ] Run `npm start` again

### ❌ "Cannot find module 'express'"
- [ ] Run `npm install` again
- [ ] Make sure you're in the budget folder
- [ ] Check that `node_modules` folder was created

### ❌ "Feedback not appearing"
- [ ] Check browser console (F12, Console tab) for errors
- [ ] Make sure server is running (Step 10)
- [ ] Refresh page (Ctrl+R)
- [ ] Check .env file is configured correctly

---

## Success! 🎉

If you've checked all items and completed all steps, your system is ready!

**Your feedback system now:**
- ✅ Saves feedback to MongoDB database
- ✅ Displays feedback on website
- ✅ Captures user email and timestamps
- ✅ Creates GitHub Issues (if configured)
- ✅ Persists data in cloud database

**Next steps:**
- Share your website with users
- Monitor feedback in MongoDB Atlas
- View GitHub Issues for feedback summaries
- Customize the design if needed

**For questions, refer to:**
- [QUICKSTART.md](QUICKSTART.md) - Quick reference
- [MONGODB_SETUP.md](MONGODB_SETUP.md) - Detailed MongoDB guide
- [README.md](README.md) - Full documentation
