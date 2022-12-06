const express = require('express');
const authRoutes = require('./routers/authRoute');
const userRoutes = require('./routers/userRoute');
require('dotenv').config({path:'./config/.env'});
require('./config/db');
const morgan = require('morgan');

const app = express();


// permet de voir les requettes Get ,Post sur le terminal 
app.use(morgan('tiny'));
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

module.exports = app;