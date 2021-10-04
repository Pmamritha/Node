// var express=require('express');
// var router=express.Router()
// router.get("/",(req,res)=>{
//    res.send("done")
// })

// router.post("/data",(req,res)=>{
//     res.send("done")
// })

// module.exports=router



var express = require('express');
var router=express.Router()

var sqlcon = require("./data/db")
router.get("/",(req,res)=>{
    sqlcon.query("select * from  employee_details", function(err,result){
        //console.log(result)
        res.send(result)
    })
  
})

router.post("/data",(req,res)=>{
    res.send("done")
})

module.exports=router
