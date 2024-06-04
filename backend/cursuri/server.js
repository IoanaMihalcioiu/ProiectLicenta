const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const courseRoutes = require('./rute/courseRoutes');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/admin/cursuri', courseRoutes);
app.use('/student/cursuri', courseRoutes);

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
    console.log(`Course service is running on port ${PORT}`);
});
