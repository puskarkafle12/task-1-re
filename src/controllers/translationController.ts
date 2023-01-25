let express = require('express')
const converter = require('json-2-csv');
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

export const addSales = async (req: Request, res: Response) =>{
  var result=''
  const {customerid, itemid, quantity} = req.body

  client.query("SELECT  from public.add_item_sale($1, $2, $5);", [customerid, itemid, quantity], (error:Error, result:any) => {
      if (error) {
        console.log(error);
        result+=`{"message":${error}}`
      } else {

          result= '{"message":`items sales added sucessfully`}'
      }
    });
   res.json(result)
  
}



const json2csv = require('json2csv').parse;

    export const salesReport = async (req: Request, res: Response) => {
      try {
        const results = await client.query("select * from public.salesreport()");

        // Convert the JSON data to CSV
        const csv = json2csv(results.rows);

        // Set the response headers to force the download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="sales-report.csv"');

        // Send the CSV as the response
        res.send(csv);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    };


  

    export const addItemTranslation = async (req: Request, res: Response) => {
      const XLSX = require('xlsx');


const workbook = XLSX.readFile('items.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const jsonData = XLSX.utils.sheet_to_json(worksheet);

jsonData.forEach((row:any) => {
    const query = `INSERT INTO items (name, description, price) VALUES ('${row.name}', '${row.description}', ${row.price});`;

    client.query(query, (err:Error, res:Response) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(res.rows[0]);
        }
    });
});



    };


  
