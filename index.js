const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');


require('dotenv').config();
require('./db/connectDB');


//Import routes
const authRoute = require('./routes/auth');
const editRoute = require('./routes/edit');
const publicRoute = require('./routes/public');

//Middleware
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Route Middlewares
app.use(cors());
app.use('/api/user', authRoute);
app.use('/', publicRoute);
app.use('/', editRoute);


const PORT = 5000;

app.listen(PORT, () => console.log('server is up and running '));

