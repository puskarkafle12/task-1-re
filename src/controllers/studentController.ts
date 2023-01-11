let crypto =require('crypto')
let jwt=require('jsonwebtoken')
let express=require('express');
const app=express()
import { NextFunction, Request,Response } from "express";
import { client } from "../database/database";
import { decode } from "punycode";
let bodyparser=require('body-parser')
client.connect(()=>{
console.log('student connected')
})
app.use(bodyparser.json());
const secretKey = 'your-secret-key';

export const addStudent= (req: Request, res: Response) => {
	let { name, email, password } = req.body;
  password = crypto.createHash('sha256').update(password).digest('hex');
  console.log(password)
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
  }

  export const getstudents=(req:Request, res:Response) =>{
    console.log('getstudents called');
	client.query('SELECT * FROM student', function (err:Error, result:any) {
		if (err) {
		  res.send(err+"errroeoreor");
		} else {
			res.send(JSON.stringify(result.rows));
		}
	  })}

      export const getStudentById=(req:Request,res:Response)=>{
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
    
    }
    export const getSubjectById=(req:Request,res:Response)=>{
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
    
    }
    export const addSubject=(req: Request, res: Response) => {
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
      }
      export const deleteStudent=(req:Request,res:Response)=>{
        const id = req.params.id;
        client.query('DELETE FROM student WHERE id =$1;', [id], (error:Error, result:any) => {
          if (error) {
            console.log(error);
          } else {
              console.log(`Deleted student with id ${id}`+result);
              res.send({"message":`sucessfully deleted student id ${id}`})
          }
        });
    }
    export const deleteSubject=(req:Request,res:Response)=>{
        const id = req.params.id;
        client.query('DELETE FROM subject WHERE id =$1;', [id], (error:Error, result:any) => {
          if (error) {
            console.log(error);
          } else {
            res.send({"message":`sucessfully deleted subject id ${id}`})
    
            console.log(`Deleted subject with id ${id}`);
          }
        });
    }



    export const login=(req: Request, res: Response) => {
        let { email, password } = req.body; 
        // console.log("login called")
        password = crypto.createHash('sha256').update(password).digest('hex');
        console.log(password)
        client.query('SELECT * FROM student WHERE email = $1 AND password = $2', [email, password], (err:Error, result:any) => {
          if (err) {
            res.status(500).send(err);
          } else if (result.rowCount === 0) {
            res.status(401).send({ message: 'Username or password is incorrect' });
          } else {
            const token = jwt.sign({ email }, secretKey);
            res.setHeader('Authorization', `${token}`);

          
            res.json({ token });
          }
        });
      }//
     export const authenticate= function authenticate(req: Request, res: Response, next: NextFunction) {
        // Get the JWT from the header of the request
        const token =  req.headers['authorization']
        console.log(token)
        if (!token) {
          return res.status(401).json({ error: 'No token provided' });
        }
        // Otherwise, verify the JWT and set the user on the request object
        jwt.verify(token, secretKey, (err: any, decoded: any) => {
          if (err) {
            return res.status(401).json({ error: 'Invalid token' });
          }
          req.body.user = decoded;
          next();
        });
      }