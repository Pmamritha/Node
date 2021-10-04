var express = require('express')
var router = express.Router()
var db = require('../config/db')



router.get('/', function (req, res,next) {

  db.query("SELECT * FROM book_details " ,function (err, result) {
    res.send(result)
  })
})




router.get('/data1', function(req, res, next) {
    db.query("select b.book_id,b.book_name,b.author,l.language,c.book_category,p.publisher,b.bookcount from ((book_details b inner join lang_details l on b.language=l.language_no) inner join categ_details c on b.book_category=c.bookcategory_no) inner join publisher_details p on b.publisher=p.publisher_no",function(err,result){
        if(err){
            throw err
            }
        res.send(result)
    })

});




router.get('/data2', function (req, res,next) {

  db.query("SELECT * FROM lang_details " ,function (err, result) {
    res.send(result)
  })
})

router.get('/data3', function (req, res,next) {

  db.query("SELECT * FROM categ_details " ,function (err, result) {
    res.send(result)
  })
})

router.get('/data4', function (req, res,next) {

  db.query("SELECT * FROM publisher_details" ,function (err, result) {
    res.send(result)
  })
})






  router.get('/:id', function (req, res) {

    db.query("SELECT b.book_id,b.book_name,b.author,l.language,c.book_category,p.publisher_name,b.bookcount from ((book_details b inner join lang_details l on b.language=l.language_no) inner join categ_details c on b.book_category=c.bookcategory_no) inner join publisher_details p on b.publisher=p.publisher_no where book_id=?",[req.params.id],function (err, result)  {
      res.send(result)

    })
  })


 router.post('/', function (req, res) {
    var data= req.body
    db.query("insert into  book_details values(?,?,?,?,?,?,?)", [data.book_id,data.book_name,data.author,data.language,data.book_category,data.publisher,data.bookcount], function (err, result) {
      
      if(err){
        throw err    }
      res.send("data added successfully")
    }
  
  
    )
  
  })


  router.put('/:id', function (req, res)  {
    var data = req.body
    db.query("update  book_details  set  bookcount=?, book_name=?,author=? where book_id=?", [data.bookcount,data.book_name,data.author,data.book_id], function (err, result) {
      if(err){
        throw err    }
      res.send("book count updated ")
    }
  
  
    )
  
  }
  )


  

  


  router.delete('/:id',function(req,res){
    var data=req.body
    db.query("delete from book_details where book_id=?",[req.params.id], function (err, result) {
      if(err){
        throw err    }
      res.send("deleted")
    }
  
  
    )
  
  }
  )
  

module.exports = router
