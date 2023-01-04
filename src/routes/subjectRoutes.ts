import { addSubject, deleteSubject, getSubjectById } from "../controllers/studentController"

var Router=require('express').Router();
Router.get('/subject/:id',getSubjectById)
Router.post('/subject',addSubject)
Router.delete('/subjects',deleteSubject)
module.exports=Router