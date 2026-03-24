const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('./'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        trim: true
    },
    githubIssueUrl: String,
    githubIssueNumber: Number
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Function to create GitHub Issue
async function createGitHubIssue(feedbackText) {
    try {
        const response = await axios.post(
            `https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}/issues`,
            {
                title: `Feedback: ${feedbackText.substring(0, 50)}...`,
                body: `**User Feedback:**\n\n${feedbackText}\n\n---\n*Auto-created by Budget Planner*`,
                labels: ['feedback']
            },
            {
                headers: {
                    Authorization: `token ${process.env.GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github.v3+json'
                }
            }
        );

        return {
            url: response.data.html_url,
            number: response.data.number
        };
    } catch (error) {
        console.error('Error creating GitHub issue:', error.response?.data || error.message);
        return null;
    }
}

// Route to add feedback
app.post('/api/feedback', async (req, res) => {
    try {
        const { text, email } = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({ error: 'Feedback text is required' });
        }

        // Create GitHub Issue
        const githubIssue = await createGitHubIssue(text);

        // Save to MongoDB
        const feedback = new Feedback({
            text: text.trim(),
            email: email || '',
            githubIssueUrl: githubIssue?.url || null,
            githubIssueNumber: githubIssue?.number || null
        });

        await feedback.save();

        res.status(201).json({
            success: true,
            message: 'Feedback saved successfully',
            feedbackId: feedback._id,
            githubIssueUrl: githubIssue?.url || null
        });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ error: 'Failed to save feedback' });
    }
});

// Route to get all feedback
app.get('/api/feedback', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ timestamp: -1 });
        res.json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ error: 'Failed to fetch feedback' });
    }
});

// Route to delete feedback
app.delete('/api/feedback/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.json({ success: true, message: 'Feedback deleted' });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ error: 'Failed to delete feedback' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
