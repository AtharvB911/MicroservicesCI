const express = require('express');
const app = express();
const PORT = 5000;

app.get('/orders', (req, res) => {
    res.json([{id: 101, item: "Laptop"}, {id: 102, item: "Phone"}]);
});

app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
