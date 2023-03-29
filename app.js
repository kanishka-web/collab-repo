require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes')
const projectRoutes = require('./routes/projectRoutes')
const userProjectRoutes = require('./routes/userprojectRoutes')
const teamRoutes = require('./routes/teamRoutes')
const teamMemberRoutes = require('./routes/teamMemberRoutes')
const weeklyDataRoutes = require('./routes/weeklyDataRoutes')
const weeklyEntryRoutes = require('./routes/weeklyEntryRoutes')
const managerRoutes = require('./routes/managerRoutes')

const port = process.env.PORT;

const dbURI = process.env.MONG_URI;
mongoose.connect(dbURI)
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.redirect('/users');
});

app.use('/users', userRoutes);

app.use('/projects', projectRoutes);

app.use('/userprojects', userProjectRoutes);

app.use('/teams', teamRoutes);

app.use('/teammembers', teamMemberRoutes);

app.use('/weeklydata', weeklyDataRoutes);

app.use('/weeklyentry', weeklyEntryRoutes);

app.use('/managers', managerRoutes);