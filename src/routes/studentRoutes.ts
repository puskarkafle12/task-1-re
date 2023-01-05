import { addStudent, addSubject, authenticate, deleteStudent, getStudentById, getSubjectById, getstudents, login } from "../controllers/studentController"

var Router=require('express').Router()

Router.post('/addstudent',addStudent)
Router.get('/students',getstudents)
Router.get('/students/:id',getStudentById)
Router.delete('/student/:id',deleteStudent)
Router.post('/login',login)

module.exports =Router

