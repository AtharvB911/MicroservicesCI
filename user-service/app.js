const express = require('express');
const app = express();
const PORT = 4000;

app.get('/users', (req, res) => {
    res.json([{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]);
});

app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
