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
 
  let {code, trans} = req.body
   trans = JSON.stringify(trans);
   console.log("SELECT update_item_translations($1, $2);", [code, trans]);
   
  //  SELECT update_item_translations('item6', '{"translations":[{"text":"hen","language":"EN"},{"text":"kukhura","language":"np"}]}');
  
client.query("SELECT update_item_translations($1, $2);", [code, trans], (error:Error, result:any) => {
    if (error) {
        console.log(error);
    } else {
        res.send("sucess :"+JSON.stringify(result.rows, null, 4));
    }
 
});

  
}
// export const addTranslation = async (req: Request, res: Response) =>{
 
//   let {code,translations} = req.body
//    translations = JSON.stringify(translations);
   


//    client.query("SELECT public.add_translation_to_item($1, $2)", [code, translations], (error: Error, result: any) => {
//     if (error) {
//         console.log(error);
//     } else {
//         res.json("sucess"+result.rows);
//     }
// });

  
// }
export const getTranslationsByLang = async (req: Request, res: Response) =>{
    try {
      const lang = req.query.language;
      const searchParameter = req.query.search;
      const result = await client.query("SELECT * FROM get_items_translation($1,$2)", [lang,searchParameter]);
        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
};
export const getItemById = async (req: Request, res: Response) =>{
  try {
      const id = req.params.id;
      const result = await client.query("SELECT * FROM get_item_by_id($1)", [id]);
      res.json(result.rows);
  } catch (error) {
      console.log(error);
      res.status(500).json({error});
  }
};