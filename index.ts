let express=require('express')
let bodyparser=require('body-parser')
const app=express();
var studentRoute=require('./src/routes/studentRoutes')
var subjectRoute=require('./src/routes/subjectRoutes')
app.use(bodyparser.json())
app.use('/api',studentRoute);
app.use('/api',subjectRoute);

app.listen(3000,()=>{
	console.log('server is running at https://localhost:3000')
})