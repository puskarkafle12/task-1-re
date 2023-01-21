"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.login = exports.deleteSubject = exports.deleteStudent = exports.addSubject = exports.getSubjectById = exports.getStudentById = exports.getstudents = exports.addStudent = void 0;
let crypto = require('crypto');
let jwt = require('jsonwebtoken');
let express = require('express');
const app = express();
const database_1 = require("../database/database");
let bodyparser = require('body-parser');
database_1.client.connect(() => {
    console.log('student connected');
});
app.use(bodyparser.json());
const secretKey = 'your-secret-key';
const addStudent = (req, res) => {
    let { name, email, password } = req.body;
    password = crypto.createHash('sha256').update(password).digest('hex');
    console.log(password);
    const query = `
	  INSERT INTO student (name, email,password)
	  VALUES ($1, $2, $3)
	`;
    database_1.client.query(query, [name, email, password], (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ "message": "student added sucessfully" });
        }
    });
};
exports.addStudent = addStudent;
const getstudents = (req, res) => {
    console.log('getstudents called');
    database_1.client.query('SELECT * FROM student', function (err, result) {
        if (err) {
            res.send(err + "errroeoreor");
        }
        else {
            res.send(JSON.stringify(result.rows));
        }
    });
};
exports.getstudents = getstudents;
const getStudentById = (req, res) => {
    const id = req.params.id;
    database_1.client.query('SELECT * FROM student WHERE id = $1', [id], (err, result) => {
        if (err) {
            res.json({ "error": "bad request",
                "error desc": err });
        }
        else {
            res.json(result.rows);
        }
    });
};
exports.getStudentById = getStudentById;
const getSubjectById = (req, res) => {
    const id = req.params.id;
    database_1.client.query('SELECT * FROM subject WHERE id = $1', [id], (err, result) => {
        if (err) {
            res.json({ "error": "bad request",
                "error desc": err });
        }
        else {
            res.json(result.rows);
        }
    });
};
exports.getSubjectById = getSubjectById;
const addSubject = (req, res) => {
    const { id, name } = req.body;
    const query = `
          INSERT INTO subject (id,name)
          VALUES ($1, $2)
        `;
    database_1.client.query(query, [id, name], (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ "message": "subject added sucessfully" });
        }
    });
};
exports.addSubject = addSubject;
const deleteStudent = (req, res) => {
    const id = req.params.id;
    database_1.client.query('DELETE FROM student WHERE id =$1;', [id], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(`Deleted student with id ${id}` + result);
            res.send({ "message": `sucessfully deleted student id ${id}` });
        }
    });
};
exports.deleteStudent = deleteStudent;
const deleteSubject = (req, res) => {
    const id = req.params.id;
    database_1.client.query('DELETE FROM subject WHERE id =$1;', [id], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send({ "message": `sucessfully deleted subject id ${id}` });
            console.log(`Deleted subject with id ${id}`);
        }
    });
};
exports.deleteSubject = deleteSubject;
const login = (req, res) => {
    let { email, password } = req.body;
    // console.log("login called")
    password = crypto.createHash('sha256').update(password).digest('hex');
    console.log(password);
    database_1.client.query('SELECT * FROM student WHERE email = $1 AND password = $2', [email, password], (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        else if (result.rowCount === 0) {
            res.status(401).send({ message: 'Username or password is incorrect' });
        }
        else {
            const token = jwt.sign({ email }, secretKey);
            res.setHeader('Authorization', `${token}`);
            res.json({ token });
        }
    });
}; //
exports.login = login;
const authenticate = function authenticate(req, res, next) {
    // Get the JWT from the header of the request
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    // Otherwise, verify the JWT and set the user on the request object
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.body.user = decoded;
        next();
    });
};
exports.authenticate = authenticate;
//# sourceMappingURL=studentController.js.map