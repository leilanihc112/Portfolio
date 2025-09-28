const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
	res.send({ status: 'social-links service is running' });
});

app.listen(PORT, () => {
	console.log(`Social links service listening on port ${PORT}`);
});

