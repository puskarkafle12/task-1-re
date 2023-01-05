"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studentController_1 = require("../controllers/studentController");
var Router = require('express').Router();
Router.post('/addstudent', studentController_1.addStudent);
Router.get('/students', studentController_1.getstudents);
Router.get('/students/:id', studentController_1.getStudentById);
Router.delete('/student/:id', studentController_1.deleteStudent);
Router.post('/login', studentController_1.login);
module.exports = Router;
//# sourceMappingURL=studentRoutes.js.map