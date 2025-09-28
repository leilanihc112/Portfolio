const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
        res.send({ status: 'auth service is running' });
});

app.listen(PORT, () => {
        console.log(`Auth service listening on port ${PORT}`);
});

