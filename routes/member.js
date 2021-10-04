var express = require('express')
var router = express.Router()


var db = require('../config/db')



router.get('/', function (req, res) {

    db.query("select * from member_details",function (err, result) {
      res.send(result)
    })
  })




// router.get('/:id', function (req, res) {

//   db.query("select * from member_details where member_id=?",[req.params.id],function (err, result)  {
//     res.send(result)
//   })
// })


router.get('/:id', function (req, res) {

  db.query("SELECT m.member_id,m.member_name,b.book_id,b.book_name,i.dateof_issue,i.dateof_return from member_details m inner join issue_details i on m.member_id=i.mem_id inner join book_details b on i.book_id=b.book_id where member_id=?",[req.params.id],function (err, result)  {
    res.send(result)
  })
})




router.post('/data1', function (req, res){
  var data = req.body
  db.query("insert into  member_details values (?,?,?)", [data.member_id, data.member_name,data.member_no], function (err, result) {
    if(err){
      throw err
    }
    res.send("added new data")
  })


  
})



router.put('/:id', function (req, res)  {
  var data = req.body
  db.query("update member_details set  member_id  =?, member_name=?, member_no=? where member_id=?", [data.member_id,data.member_name,data.member_no,req.params.id], function (err, result) {
    res.send("updated data")
  }


  )

}
)

router.delete('/:id',function(req,res){
  var data=req.body
  db.query("delete from member_details where member_id=?",[req.params.id], function (err, result) {
    if(err){
      throw err    }
    res.send("deleted")
  }


  )


}
)



module.exports = router



