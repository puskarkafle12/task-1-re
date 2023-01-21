"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studentController_1 = require("../controllers/studentController");
var Router = require('express').Router();
Router.get('/subject/:id', studentController_1.authenticate, studentController_1.getSubjectById);
Router.post('/subject', studentController_1.authenticate, studentController_1.addSubject);
Router.delete('/subjects', studentController_1.authenticate, studentController_1.deleteSubject);
module.exports = Router;
//# sourceMappingURL=subjectRoutes.js.map