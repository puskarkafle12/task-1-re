import { addStudent, addSubject, deleteStudent, getStudentById, getSubjectById, getstudents, login } from "../controllers/studentController"

var Router=require('express').Router()

Router.post('/addstudent',addStudent)
Router.get('/students',getstudents)
Router.get('/students/:id',getStudentById)
Router.delete('/students',deleteStudent)
Router.post('/login',login)

module.exports =Router

