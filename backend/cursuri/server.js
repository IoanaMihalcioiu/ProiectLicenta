const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const courseRoutes = require('./rute/courseRoutes');

const algoliasearch = require('algoliasearch');
const Course = require('./modele/courseModel');
const client = algoliasearch('BGLGWGCE3Q', 'f4772c4208cdcb5b37693e32f25f57e6');
const index = client.initIndex('courses');



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
app.use('/student/search', courseRoutes);

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
    console.log(`Course service is running on port ${PORT}`);
});

const indexAllCourses = () => {
    Course.getAll((err, courses) => {
        if (err) {
            console.error('Error fetching courses:', err);
            return;
        }

        index.saveObjects(courses, { autoGenerateObjectIDIfNotExist: true })
            .then(({ objectIDs }) => {
                console.log('Courses indexed:', objectIDs);
            })
            .catch(err => {
                console.error('Error indexing courses:', err);
            });
    });
};

indexAllCourses();