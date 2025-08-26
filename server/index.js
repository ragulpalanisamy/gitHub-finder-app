const express = require('express');
const axios = require('axios');

const app = express();

app.post('/sendToSlack', async (req, res) => {
    const { formData } = req.body;
    const token = 'W4fl89C6OvbANdsoRxwh9IjO';
    const channelId = 'C06AL49G5QU';

    try {
        const url = 'https://slack.com/api/chat.postMessage';
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const postData = {
            channel: channelId,
            text: JSON.stringify(formData),
        };

        const response = await axios.post(url, postData, { headers });
        res.json({ success: true, response: response.data });
    } catch (error) {
        console.error('Error posting message to Slack:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start your server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
