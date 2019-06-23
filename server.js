 require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('@pusher/chatkit-server');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

const api = require('./server/routes/api.js');

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
// API location
app.use('/api', api);
// Send all other requests to the Angular app
app.get('*', (req, res) => {
    console.log('hey you are *')
    res.sendFile(path.join(__dirname, 'emgat-client/src/index.html'));
});



app.set('port', process.env.PORT || 4200);

const server = app.listen(app.get('port'), () => {
    console.log(`EXPRESS RUNNING -> PORT ${server.address().port}`);
});



module.exports = server;