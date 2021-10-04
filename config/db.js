var mysql = require('mysql')
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Amritha@24',
    database:'library'
})

connection.connect(function(err){
    if (err) throw err
 console.log("connection success")
})

module.exports=connection;