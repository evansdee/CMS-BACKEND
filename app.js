require('dotenv').config({path: `${process.cwd()}/.env`})
const express = require('express')
const authRouter = require('./route/authRoute')
const catchAsync = require('./utils/catchAsync')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controller/globalError')

const app = express()

app.use(express.json())

// TO CHECK IF SERVER IS RUNNING 
// app.get('/',(req,res)=>{
//     res.status(200).json({
//         status:"success",
//         message:'woohoo restful is working'
//     })
// })

app.use('/api/v1/auth',authRouter)

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