"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
app.use(express.json());
var Client = require('pg').Client;
var bodyparser = require('body-parser');
var client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "T1"
});
client.connect(function () {
    console.log('database is connected');
});
app.post('/addstudent', (req, res) => {
    const { name, email, password } = req.body;
    const query = `
	  INSERT INTO student (name, email,password)
	  VALUES ($1, $2, $3)
	`;
    client.query(query, [name, email, password], (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ "message": "student added sucessfully" });
        }
    });
});
app.get('/students', function (req, res) {
    client.query('SELECT * FROM student', function (err, result) {
        if (err) {
            res.send(err + "errroeoreor");
        }
        else {
            res.send(JSON.stringify(result.rows));
        }
    });
});
app.get('/students/:id', (req, res) => {
    // const id=request.params.id
    const id = req.params.id;
    client.query('SELECT * FROM student WHERE studentid = $1', [id], (err, result) => {
        if (err) {
            res.json({ "error": "bad request",
                "error desc": err });
        }
        else {
            res.json(result.rows);
        }
    });
});
app.get('/subjects', (req, res) => {
    // const id=request.params.id
    const id = req.params.id;
    client.query('SELECT * FROM subject', (err, result) => {
        if (err) {
            res.json({ "error": "bad request",
                "error desc": err });
        }
        else {
            res.json(result.rows);
        }
    });
});
app.get('/subject/:id', (req, res) => {
    // const id=request.params.id
    const id = req.params.id;
    client.query('SELECT * FROM subject WHERE id = $1', [id], (err, result) => {
        if (err) {
            res.json({ "error": "bad request",
                "error desc": err });
        }
        else {
            res.json(result.rows);
        }
    });
});
app.post('/addsubject', (req, res) => {
    const { studentid, name } = req.body;
    const query = `
	  INSERT INTO subject (studentid,name)
	  VALUES ($1, $2)
	`;
    client.query(query, [studentid, name], (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ "message": "subject added sucessfully" });
        }
    });
});
app.delete('/student:id', (req, res) => {
    const id = req.params.id;
    client.query('DELETE FROM student WHERE studentid =$1;', [id], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(`Deleted student with id ${id}`);
        }
    });
});
app.listen(3000, function () {
    console.log('Server is running at https://localhost:3000');
});
//# sourceMappingURL=index.js.map