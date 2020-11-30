const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const https = require('https');
const fs = require('fs')

require('dotenv').config();
require('./db/connectDB');

var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/aevin.app/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/aevin.app/cert.pem', 'utf8'),
    ca: fs.readFileSync('/etc/letsencrypt/live/aevin.app/chain.pem', 'utf8'),
};

//Import routes
const authRoute = require('./routes/auth');
const editRoute = require('./routes/edit');
const publicRoute = require('./routes/public');

//Middleware
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Route Middlewares
app.use(cors({ origin:true, credentials:true }));
app.use('/api/user', authRoute);
app.use('/', publicRoute);
app.use('/', editRoute);


const server = https.createServer(options, app)

const PORT = 8443;

server.listen(PORT, () => console.log('server is up and running ' ));
