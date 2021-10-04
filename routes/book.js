var express = require('express')
var router = express.Router()
var db = require('../config/db')

router.get('/', function (req, res, next) {

  db.query("select i.book_id,m.member_id,m.member_name,i.dateof_issue,i.dateof_return from issue_details i inner join member_details m on i.mem_id=m.member_id", function (err, result) {
    res.send(result)
  })
})

router.get('/data', function (req, res,next) {

  db.query("SELECT * FROM issue_details " ,function (err, result) {
    res.send(result)
  })
})





router.get('/:id', function (req, res, next) {

  db.query("select i.book_id,m.member_id,m.member_name,i.dateof_issue,i.dateof_return from issue_details i inner join member_details m on i.mem_id=m.member_id where book_id=?", [req.params.id], function (err, result) {
    if (err) {
      throw err
    } res.send(result)
  })
})




router.post('/data', function (req, res) {
  var data = req.body
  db.query("insert into  issue_details values(?,?,?,?)", [data.book_id, data.mem_id, data.dateof_issue, data.dateof_return], function (err, result) {
    res.send("data added successfully")
  }


  )

})






router.post('/', function (req, res) {
  var data = req.body
  db.query("insert into  issue_details values (?,?,?,?)", [data.book_id, data.mem_id, data.dateof_issue, data.dateof_return], function (err, result) {
    if (err) {
      throw err
    }
    db.query("UPDATE book_details SET bookcount=bookcount-1  where book_id=?", [data.book_id], function (err, result) {
      if (err) {
        throw err
      }

    })
    res.send("data saved")
  }
  )
})



router.put('/:id', function (req, res) {
  var data = req.body
  db.query("update issue_details set book_id=?,mem_id=?,dateof_issue=?,dateof_return=? where book_id=?", [data.book_id, data.mem_id, data.dateof_issue, data.dateof_return, req.params.id], function (err, result) {
    if (err) {
      throw err
    }


    db.query("update  book_details  set bookcount=bookcount+1  where book_id=? ", [data.book_id], function (err, result4) {
      if (err) {
        throw err
      }

    })
    res.send("data saved")
  }
  )
})


router.delete('/:id', function (req, res) {
  var data = req.body
  db.query("delete from issue_details where book_id=?", [req.params.id], function (err, result) {
    if (err) {
      throw err
    }
    res.send("deleted")
  }


  )

}
)

module.exports = router




