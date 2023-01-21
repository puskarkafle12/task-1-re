"use strict";
let express = require('express');
let bodyparser = require('body-parser');
let cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
var studentRoute = require('./src/routes/studentRoutes');
var subjectRoute = require('./src/routes/subjectRoutes');
var itemRoute = require('./src/routes/itemRoutes');
app.use(bodyparser.json());
app.use('/api', studentRoute);
app.use('/api', subjectRoute);
app.use('', itemRoute);
app.listen(3000, () => {
    console.log('server is running at https://localhost:3000');
});
//# sourceMappingURL=index.js.map