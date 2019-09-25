var express = require("express")
var cors = require("cors")
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var app = express ()

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))

var Vache = require('./routes/Vaches')

app.use('/vaches',Vache)

app.listen(port,()=>{
    console.log("server port :"+port)
})