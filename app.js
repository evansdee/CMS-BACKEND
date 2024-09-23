require('dotenv').config({path: `${process.cwd()}/.env`})
const cors = require("cors")
const path = require('path');
const express = require('express')
const fileRouter = require('./route/uploadRoute'); // Update with the correct path
const authRouter = require('./route/authRoute')
const sessionRouter = require('./route/sessionRoute')
const courseRouter = require('./route/courseRoute')
const enrollmentRouter = require('./route/enrollmentRoute')
const catchAsync = require('./utils/catchAsync')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controller/globalError')


// TEST ALL ROTE 


const app = express()

app.use(express.json())
app.use(cors());


app.use(express.urlencoded({ extended: true }));

// Serve the photos folder as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1', fileRouter);
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/enrollments',enrollmentRouter)
app.use('/api/v1/sessions',sessionRouter)
app.use('/api/v1/courses',courseRouter)
// app.use('/api/v1/upload',courseRouter)

app.use("*",catchAsync(async (req,res,next)=>{
   throw new AppError(`cant find the ${req.originalUrl} on this server`,404)
}))
// console.log(process.env.NODE_ENV)
app.use(globalErrorHandler)

const PORT =process.env.APP_PORT || 4000
console.log(process.env.APP_PORT)

app.listen(PORT,()=>{
    console.log('server up and runnning',PORT)
})  