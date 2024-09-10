require('dotenv').config({path: `${process.cwd()}/.env`})
const express = require('express')
const authRouter = require('./route/authRoute')

const app = express()

app.get('/',(req,res)=>{
    res.status(200).json({
        status:"success",
        message:'woohoo restful is working'
    })
})

app.use('/api/v1/auth',authRouter)

app.use("*",(req,res,next)=>{
    res.status(404).json({
        status:'fail',
        message:'such route no exist'
    })
})


const PORT =process.env.APP_PORT || 4000
console.log(process.env.APP_PORT)

app.listen(PORT,()=>{
    console.log('server up and runnning',PORT)
})  