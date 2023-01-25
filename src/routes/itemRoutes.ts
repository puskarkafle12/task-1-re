const {salesReport,getItemById,getTranslationsByLang,addItem,updateItem} = require('../controllers/translationController')
const Router = require('express').Router()
Router.get('/items',getTranslationsByLang)
Router.get('/items/:id',getItemById)
Router.put('/items',updateItem)
// Router.post('/items',addTranslation)
Router.post('/additem/',addItem)
Router.get('/salesreport',salesReport)
module.exports = Router