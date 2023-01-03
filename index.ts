import { json } from 'body-parser';
import { Request, Response } from 'express';


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
app.post('/addstudent', (req: Request, res: Response) => {
	const { name, email, password } = req.body;
	const query = `
	  INSERT INTO student (name, email,password)
	  VALUES ($1, $2, $3)
	`;
	client.query(query, [name, email, password], (err:any, result:any) => {
	  if (err) {
		res.send(err);
	  } else {
		res.json({"message":"student added sucessfully"});
	  }
	});
  });
  app.listen(3000, function () {
    console.log('Server is running at https://localhost:3000');
});

app.get('/students', function (req:Request, res:Response) {
	client.query('SELECT * FROM student', function (err:Error, result:any) {
		if (err) {
		  res.send(err+"errroeoreor");
		} else {
			res.send(JSON.stringify(result.rows));
		}
	  });
	  
	  
	  
});
