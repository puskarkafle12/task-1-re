import { addSubject, authenticate, deleteSubject, getSubjectById } from "../controllers/studentController"

var Router=require('express').Router();
Router.get('/subject/:id',authenticate,getSubjectById)
Router.post('/subject',authenticate,addSubject)
Router.delete('/subjects',authenticate,deleteSubject)
module.exports=Router