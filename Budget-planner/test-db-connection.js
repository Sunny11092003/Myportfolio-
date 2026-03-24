const mongoose = require('mongoose');
require('dotenv').config();

async function testDatabaseConnection() {
    console.log('🔍 Testing Database Connection...\n');
    
    // Check if .env variables are set
    console.log('✓ Checking environment variables...');
    if (!process.env.MONGODB_URI) {
        console.error('❌ MONGODB_URI not found in .env file');
        process.exit(1);
    }
    console.log('✓ MONGODB_URI is configured');
    
    // Test MongoDB connection
    try {
        console.log('\n⏳ Connecting to MongoDB Atlas...');
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB connected successfully!\n');
        
        // Get database info
        const connection = mongoose.connection;
        console.log('Database Info:');
        console.log('  Name:', connection.db.s.namespace.db);
        console.log('  Host:', connection.host);
        
        // Create a test schema
        const testSchema = new mongoose.Schema({
            text: String,
            timestamp: { type: Date, default: Date.now },
            email: String,
            githubIssueUrl: String
        });
        
        const TestFeedback = mongoose.model('TestFeedback', testSchema);
        
        // Test write operation
        console.log('\n⏳ Testing write operation...');
        const testFeedback = new TestFeedback({
            text: 'Test feedback - ' + new Date().toISOString(),
            email: 'test@example.com'
        });
        await testFeedback.save();
        console.log('✅ Write test successful! Feedback saved with ID:', testFeedback._id);
        
        // Test read operation
        console.log('\n⏳ Testing read operation...');
        const savedFeedback = await TestFeedback.findById(testFeedback._id);
        console.log('✅ Read test successful! Retrieved feedback:', savedFeedback.text);
        
        // Delete test data
        console.log('\n⏳ Cleaning up test data...');
        await TestFeedback.deleteOne({ _id: testFeedback._id });
        console.log('✅ Cleanup successful!');
        
        console.log('\n' + '='.repeat(50));
        console.log('✅ ALL TESTS PASSED!');
        console.log('='.repeat(50));
        console.log('\nYour database is ready! You can now:');
        console.log('  1. Run: npm start');
        console.log('  2. Open budget.html in your browser');
        console.log('  3. Submit feedback from the form');
        console.log('  4. Check MongoDB Atlas Collections to see saved feedback\n');
        
    } catch (error) {
        console.error('\n❌ Connection Failed!');
        console.error('Error:', error.message);
        console.error('\nTroubleshooting tips:');
        console.error('  1. Check MONGODB_URI in .env file');
        console.error('  2. Verify username and password are correct');
        console.error('  3. Ensure IP Access is set to 0.0.0.0/0 in MongoDB Atlas');
        console.error('  4. Wait a few minutes for cluster to fully initialize');
        console.error('\nRead MONGODB_SETUP.md for detailed instructions');
    } finally {
        await mongoose.disconnect();
        console.log('\nDatabase connection closed.');
    }
}

testDatabaseConnection();
