# Budget Planner with GitHub Feedback System

This is a full-stack application that stores feedback in MongoDB and automatically creates GitHub Issues.

## Setup Instructions

### 1. MongoDB Setup
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a free account and a cluster
- Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)

### 2. GitHub Setup
- Go to GitHub Settings → Developer settings → [Personal access tokens](https://github.com/settings/tokens)
- Create a **New token (classic)** with these scopes:
  - `repo` (Full control of private repositories)
  - `public_repo` (Access public repositories)
- Copy your token (you'll use it in the `.env` file)

### 3. Local Setup

**Step 1:** Install Node.js from [nodejs.org](https://nodejs.org/)

**Step 2:** Open terminal/PowerShell in your budget folder and run:
```bash
npm install
```

**Step 3:** Create a `.env` file in the budget folder:
```
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/budget-planner?retryWrites=true&w=majority
GITHUB_TOKEN=ghp_your_token_here
GITHUB_REPO_OWNER=your_github_username
GITHUB_REPO_NAME=your_repository_name
PORT=5000
NODE_ENV=development
```

Replace:
- `your_username` and `your_password` with your MongoDB credentials
- `your_cluster` with your MongoDB cluster name
- `ghp_your_token_here` with your GitHub Personal Access Token
- `your_github_username` with your GitHub username
- `your_repository_name` with your GitHub repository name (where you want issues created)

**Step 4:** Start the server:
```bash
npm start
```

You should see: `Server running on port 5000` and `MongoDB connected`

### 4. Access Your App
- Open `budget.html` in your browser
- The feedback system connects to http://localhost:5000

## How It Works

1. **User submits feedback** on the website
2. **Feedback is saved** to MongoDB immediately
3. **GitHub Issue is created** automatically with the feedback
4. **User sees confirmation** with link to the GitHub Issue

## Features

✅ Store feedback in MongoDB  
✅ Automatically create GitHub Issues  
✅ Display feedback with timestamps  
✅ Capture optional email from users  
✅ Link to GitHub issues from feedback  
✅ Auto-refresh feedback every 30 seconds  
✅ XSS protection with HTML escaping  

## Troubleshooting

**"Unable to connect to server"**
- Make sure server is running: `npm start`
- Check that it says "MongoDB connected"

**"Failed to save feedback"**
- Check your `.env` file is correctly configured
- Verify MongoDB connection string
- Check GitHub token has correct permissions

**Issues not appearing on GitHub**
- Verify `GITHUB_REPO_OWNER` and `GITHUB_REPO_NAME` are correct
- Check GitHub token has `repo` permission
- Ensure the repository exists

## File Structure
```
budget/
├── budget.html          (Frontend)
├── server.js            (Backend/API)
├── package.json         (Dependencies)
├── .env                 (Configuration - keep private!)
└── .env.example         (Template)
```

## Deployment (Optional)

To deploy to production, you can use:
- **Vercel** (Easy, free tier available)
- **Heroku** (Free tier no longer available, but easy setup)
- **Railway** (Good free tier)
- **Render** (Good free tier)

## Notes

- Keep your `.env` file private - never commit it to GitHub
- The `.env.example` is for reference only
- Feedback data is stored permanently in MongoDB
- GitHub Issues are created with a 'feedback' label for easy filtering
