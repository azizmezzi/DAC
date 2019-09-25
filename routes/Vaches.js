const express = require("express")
const Vaches =express.Router()
const cors =require('cors')
const jwt =require("jsonwebtoken")
const bcrypy =require('bcrypt')

const Vache =require('../model/Vaches')
Vaches.use(cors())

process.env.SECRET_KEY='secret'

Vaches.post('/register',(req,res)=>{
    const vacheData ={
        name:req.body.name
    }
    Vache.create(vacheData)
})
module.exports=Vaches