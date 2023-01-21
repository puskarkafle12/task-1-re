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
exports.getItemById = exports.getTranslationsByLang = exports.addTranslation = exports.updateItem = exports.addItem = void 0;
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
            res.send("sucess " + JSON.stringify(result.rows, null, 4));
        }
    });
});
exports.updateItem = updateItem;
const addTranslation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { code, translations } = req.body;
    translations = JSON.stringify(translations);
    database_1.client.query("SELECT public.add_translation_to_item($1, $2)", [code, translations], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            res.json("sucess" + result.rows);
        }
    });
});
exports.addTranslation = addTranslation;
const getTranslationsByLang = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lang = req.query.language;
        const result = yield database_1.client.query("SELECT * FROM get_items_translation($1)", [lang]);
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
//# sourceMappingURL=translationController.js.map