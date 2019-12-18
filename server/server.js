const express = require('express');
const cors = require('cors');
const axios = require('axios');
const server = express();
const BodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const port = 3002;

server.use(express());
server.use(cors());
server.use(BodyParser.json())


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'reviews'
  });

connection.connect((err) => {
    if (err) {
        console.error(err);
    }else {
        console.log('connection successful')
    }
});

server.get('/getReviews', (req,res) => {
    res.sendFile(path.join(`${__dirname}/../dist/bundle.js`))
});

server.get('/reviews/:id', (req, res) => {
   connection.query(`SELECT * FROM user_reviews WHERE id='${req.params.id}'`, (err, results) => {
        if(err) {
            console.log(err)
        } else {
            res.status(200).send(results)
        }
    })    
});

server.post('/reviews', (req, res) => {
    connection.query(`INSERT INTO user_reviews (id, username,review_title, review, rating) VALUE ("${req.body.id}","${req.body.username}", "${req.body.review_title}", "${req.body.review}", ${req.body.rating});`, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            res.status(200).send(results)
            console.log('added to db')
        }
    })
});


server.listen(port, () => {
    console.log(`listening on port${port}`)
})
