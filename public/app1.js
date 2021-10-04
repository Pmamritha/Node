// var express = require('express');
// var app = express();

// var router=express.Router()
// app.use(express.static('public'))

// router.get("/",(req,res)=>{
//     res.end("done")
// })

// router.post("/data",(req,res)=>{
//     res.send("done")
// })
// app.use('/employee',router)
// app.listen(3000)

//module router
var exp=require('express');
var app=exp();
app.use(exp.static('public'))

var emp=require('./employee')
app.use("/employee",emp)     //route will active
app.listen(3000)
