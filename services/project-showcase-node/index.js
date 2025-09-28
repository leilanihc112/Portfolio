const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
        res.send({ status: 'project-showcase service is running' });
});

app.listen(PORT, () => {
        console.log(`Project Showcase service listening on port ${PORT}`);
});

