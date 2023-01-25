const {salesReport,getItemById,getTranslationsByLang,addItemFromxsls,addItem,updateItem} = require('../controllers/translationController')
const Router = require('express').Router()
Router.get('/items',getTranslationsByLang)
Router.get('/items/:id',getItemById)
Router.put('/items',updateItem)
Router.post('/additem/',addItem)
Router.get('/salesreport',salesReport)
Router.get('/additemfromexcel',addItemFromxsls)
module.exports = Router