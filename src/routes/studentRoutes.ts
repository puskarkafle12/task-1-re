import { addStudent, addSubject, authenticate, deleteStudent, getStudentById, getSubjectById, getstudents, login } from "../controllers/studentController"

var Router=require('express').Router()

Router.post('/addstudent',authenticate,addStudent)
Router.get('/students',authenticate,getstudents)
Router.get('/students/:id',authenticate,getStudentById)
Router.delete('/student/:id',authenticate,deleteStudent)
Router.post('/login',login)

module.exports =Router

