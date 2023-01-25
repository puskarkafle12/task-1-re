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
exports.addItemTranslation = exports.salesReport = exports.addSales = exports.getItemById = exports.getTranslationsByLang = exports.updateItem = exports.addItem = void 0;
let express = require('express');
const converter = require('json-2-csv');
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
    let { code, trans } = req.body;
    trans = JSON.stringify(trans);
    console.log("SELECT update_item_translations($1, $2);", [code, trans]);
    //  SELECT update_item_translations('item6', '{"translations":[{"text":"hen","language":"EN"},{"text":"kukhura","language":"np"}]}');
    database_1.client.query("SELECT update_item_translations($1, $2);", [code, trans], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send("sucess :" + JSON.stringify(result.rows, null, 4));
        }
    });
});
exports.updateItem = updateItem;
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
const getTranslationsByLang = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lang = req.query.language;
        const searchParameter = req.query.search;
        const result = yield database_1.client.query("SELECT * FROM get_items_translation($1,$2)", [lang, searchParameter]);
        res.json(result.rows);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.getTranslationsByLang = getTranslationsByLang;
const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield database_1.client.query("SELECT * FROM get_item_by_id($1)", [id]);
        res.json(result.rows);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.getItemById = getItemById;
const addSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var result = '';
    const { customerid, itemid, quantity } = req.body;
    database_1.client.query("SELECT  from public.add_item_sale($1, $2, $5);", [customerid, itemid, quantity], (error, result) => {
        if (error) {
            console.log(error);
            result += `{"message":${error}}`;
        }
        else {
            result = '{"message":`items sales added sucessfully`}';
        }
    });
    res.json(result);
});
exports.addSales = addSales;
const json2csv = require('json2csv').parse;
const salesReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield database_1.client.query("select * from public.salesreport()");
        // Convert the JSON data to CSV
        const csv = json2csv(results.rows);
        // Set the response headers to force the download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="sales-report.csv"');
        // Send the CSV as the response
        res.send(csv);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.salesReport = salesReport;
const addItemTranslation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const XLSX = require('xlsx');
    const workbook = XLSX.readFile('items.xlsx');
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    jsonData.forEach((row) => {
        const query = `INSERT INTO items (name, description, price) VALUES ('${row.name}', '${row.description}', ${row.price});`;
        database_1.client.query(query, (err, res) => {
            if (err) {
                console.log(err.stack);
            }
            else {
                console.log(res.rows[0]);
            }
        });
    });
});
exports.addItemTranslation = addItemTranslation;
//# sourceMappingURL=translationController.js.map