"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubject = exports.addSubject = exports.getSubjectById = void 0;
let express = require('express');
const app = express();
let { client } = require('../database');
let bodyparser = require('body-parser');
client.connect(() => {
    console.log('connected');
});
app.use(bodyparser.json());
const getSubjectById = (req, res) => {
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
};
exports.getSubjectById = getSubjectById;
const addSubject = (req, res) => {
    const { id, name } = req.body;
    const query = `
      INSERT INTO subject (id,name)
      VALUES ($1, $2)
    `;
    client.query(query, [id, name], (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ "message": "subject added sucessfully" });
        }
    });
};
exports.addSubject = addSubject;
const deleteSubject = (req, res) => {
    const id = req.params.id;
    client.query('DELETE FROM subject WHERE id =$1;', [id], (error, result) => {
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
//# sourceMappingURL=subjectController.js.map