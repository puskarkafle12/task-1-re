let express = require('express')
const app = express()
import { Request, Response } from 'express';
import { client } from '../database/database';
let bodyparser = require('body-parser')
const crypto = require('crypto');
app.use(bodyparser.json());
export const addItem = async (req: Request, res: Response) =>{
    const {translationtext,language,code} = req.body
    function generateId(length :any) {
        return crypto.randomBytes(Math.ceil(length / 2))
          .toString('hex') // convert to hexadecimal format
          .slice(0, length);   // return required number of characters
      }
      
      const translationcode = (generateId(8));
      

     
    client.query("SELECT public.insert_translation($1, $2, $3)", [translationcode,translationtext ,language], (error:Error, result:any) => {
        if (error) {
          console.log(error);
        } else {
           
            // result= '{"message":`sucessfully addedtranslation ${code}`}'
        }
      });
    client.query("SELECT public.insert_item($1, $2)", [code, translationcode], (error:Error, result:any) => {
        if (error) {
          console.log(error);
        } else {
           
            res.send({"message":`sucessfully addeditem and translation ${code}`})
        }
      });
    
}
export const updateItem = async (req: Request, res: Response) =>{
 
  let {code,translations} = req.body
   translations = JSON.stringify(translations);
   


client.query("SELECT update_item_translations($1, $2)", [code, translations], (error:Error, result:any) => {
    if (error) {
        console.log(error);
    } else {
        res.send("sucess "+JSON.stringify(result, null, 4));
    }
 
});

  
}
// export const updateItem = async (req: Request, res: Response) =>{
//     const {itemcode,t_data} = req.body

//       const result = await Sequlize.query("SELECT * from  insert_items(:itemcode,:t_data)", {
//         replacements: { itemcode: itemcode,t_data:t_data },
//         type: Sequlize.QueryTypes.SELECT
//     }
//     )
//     res.send(result)
    
// }
// export const getItemById = async (req: Request, res: Response) =>{
//     const id = parseInt(req.params.id);
//    const [results, metadata] = await Sequlize.query("SELECT  * from getitembyid(:id)",{
//         replacements: { id : id }
//     })
//     res.send(results)
  
 
// }
// export const getItems = async (req: Request, res: Response) =>{
//    const [results, metadata] = await Sequlize.query("SELECT  * from getitems()");
//     res.send(results)
 
// }