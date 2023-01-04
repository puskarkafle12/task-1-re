import { json } from 'body-parser';
import { Request, Response } from 'express';
import { request } from 'http';
import { setUncaughtExceptionCaptureCallback } from 'process';


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
  

app.get('/students', function (req:Request, res:Response) {
	client.query('SELECT * FROM student', function (err:Error, result:any) {
		if (err) {
		  res.send(err+"errroeoreor");
		} else {
			res.send(JSON.stringify(result.rows));
		}
	  });
	  
	  
	
	  
	  
});
app.get('/students/:id',  (req:Request,res:Response)=>{
	// const id=request.params.id
	const id = req.params.id
	 client.query('SELECT * FROM student WHERE id = $1', [id],(err:Error,result:any)=>{
		if(err){
			res.json({"error":"bad request",
		"error desc":err});
		}
		else{
			res.json(result.rows)
		}

	 });

});

app.get('/subjects',  (req:Request,res:Response)=>{
	// const id=request.params.id
	const id = req.params.id
	 client.query('SELECT * FROM subject',(err:Error,result:any)=>{
		if(err){
			res.json({"error":"bad request",
		"error desc":err});
		}
		else{
			res.json(result.rows)
		}

	 });

});
app.get('/subject/:id',  (req:Request,res:Response)=>{
	// const id=request.params.id
	const id = req.params.id
	 client.query('SELECT * FROM subject WHERE id = $1', [id],(err:Error,result:any)=>{
		if(err){
			res.json({"error":"bad request",
		"error desc":err});
		}
		else{
			res.json(result.rows)
		}

	 });

});

app.post('/addsubject', (req: Request, res: Response) => {
	const { id, name } = req.body;
	const query = `
	  INSERT INTO subject (id,name)
	  VALUES ($1, $2)
	`;
	client.query(query, [id,name], (err:any, result:any) => {
	  if (err) {
		res.send(err);
	  } else {
		res.json({"message":"subject added sucessfully"});
	  }
	});
  });
app.delete('/student:id',(req:Request,res:Response)=>{
	const id = req.params.id;
	client.query('DELETE FROM student WHERE id =$1;', [id], (error:Error, result:any) => {
	  if (error) {
		console.log(error);
	  } else {
		console.log(`Deleted student with id ${id}`);
	  }
	});
})
  
app.post('/login', (req: Request, res: Response) => {
	// get the username and password from the request body
	const { email, password } = req.body;
  
	// check if the username and password are correct
	client.query('SELECT * FROM student WHERE email = $1 AND password = $2', [email, password], (err:Error, result:any) => {
	  if (err) {
		// there was an error executing the query
		res.status(500).send(err);
	  } else if (result.rowCount === 0) {
		// the username or password was incorrect
		res.status(401).send({ message: 'Username or password is incorrect' });
	  } else {
		// the login was successful
		res.send({ message: 'Successfully logged in' });
	  }
	});
  });
  
  
  
  
  


  app.listen(3000, function () {
    console.log('Server is running at https://localhost:3000');
});