const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const adminRoutes = require('./rute/administrare');
const chatRoutes = require('./chat/chatRoutes');


const app = express();



app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["POST", "GET",'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(bodyParser.json());
app.use('/admin', adminRoutes);
app.use('/admin/chat', chatRoutes);


const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Admin service is running on port ${PORT}`);
});


