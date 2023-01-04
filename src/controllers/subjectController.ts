let express = require('express')
const app = express()
import { Request, Response } from 'express';
let {client} = require('../database')
let bodyparser = require('body-parser')
client.connect(() =>{
    console.log('connected')
})
app.use(bodyparser.json())
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