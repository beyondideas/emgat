const express = require('express');
const router = express.Router();
const path = require('path');
var Route = require('router');
const usersList =[]
const server = require('../../server.js');

const axios = require('axios');
const io = require('socket.io')(server);
io.on('connection', (client) => {
    client.on('event', data => { /* … */ });
    client.on('disconnect', () => { /* … */ });


    router.get('/', (req, res)=> {
        res.send({carine: 'her man'})
    });
    router.post('/', (req, res)=> {
            console.log(req.body)
    });


    router.post('/users', (req, res) => {
        const username = req.body;
        console.log('req.body',req.body,  username, )
        res.json(username)

        // tmKit.createUser({
        //     id: username.username,
        //     name: username
        // })
        // .then((newUser) => {'
        //     console.log('what is tmkit nonw', newUser);
        //     console.log('dod we make it here')
        //     res.sendStatus(201).json(username);
        // }).catch((err) => { 
        //     if (err.error === 'services/chatkit/user_already_exists') {
        //         res.sendStatus(200);
        //       } else {
        //         res.status(err.status).json(err);
        //       }
        // });
    });

    router.get('/users-list', (req, res) => {
        console.log('the userlist', usersList)
        res.json({usersList: usersList});
    })
    router.post('/authenticate', (req, res) => {
    
        res.status(authData.status).send(authData.body);
    });

});



module.exports = router;