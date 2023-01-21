"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.addItem = void 0;
let express = require('express');
const app = express();
const database_1 = require("../database/database");
let bodyparser = require('body-parser');
const crypto = require('crypto');
app.use(bodyparser.json());
const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { translationtext, language, code } = req.body;
    function generateId(length) {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex') // convert to hexadecimal format
            .slice(0, length); // return required number of characters
    }
    const translationcode = (generateId(8));
    database_1.client.query("SELECT public.insert_translation($1, $2, $3)", [translationcode, translationtext, language], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            // result= '{"message":`sucessfully addedtranslation ${code}`}'
        }
    });
    database_1.client.query("SELECT public.insert_item($1, $2)", [code, translationcode], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send({ "message": `sucessfully addeditem and translation ${code}` });
        }
    });
});
exports.addItem = addItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { code, translations } = req.body;
    translations = JSON.stringify(translations);
    database_1.client.query("SELECT update_item_translations($1, $2)", [code, translations], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send("sucess " + JSON.stringify(result, null, 4));
        }
    });
});
exports.updateItem = updateItem;
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
//# sourceMappingURL=translationController.js.map