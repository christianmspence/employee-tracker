const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const { initApp } = require('./app');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

initApp();