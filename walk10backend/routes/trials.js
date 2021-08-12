const express = require('express')
const router = express.Router()
const db = require('../db')
function quote (string) {
  return "'" + string + "'"
}

router.post('/', function (req, res, next) {
  console.log(req.body)
  if ([req?.body?.patientid, req?.body?.distance, req?.body?.slow1, req?.body?.slow2, req?.body?.fast1, req?.body?.fast2, req?.body?.slowspeed, req?.body?.fastspeed, req?.body?.assistlevel, req?.body?.time].includes(undefined)) {
    res.send('missing required params')
  } else {
    db.serialize(() => {
      const command = `INSERT INTO trials 
        (patientid, distance, slow1, slow2, fast1, fast2, slowspeed, fastspeed, assistlevel, time ${req.body.notes !== undefined ? ', notes' : ''} )
        VALUES(${req.body.patientid}, 
          ${req.body.distance},
          ${req.body.slow1},
          ${req.body.slow2},
          ${req.body.fast1},
          ${req.body.fast2}, 
          ${req.body.slowspeed},
          ${req.body.fastspeed},
          ${req.body.assistlevel},
          datetime(${quote(req.body.time)})
        ${req.body.notes !== undefined ? ', ' + quote(req.body.notes) : ''});`

      console.log(command)
      db.run(command, (err) => {
        if (err) {
          console.error(err.message)
        }
      })
    })
    res.send('respond with a resource')
  }
})
router.get('/:patientID', function (req, res, next) {
  db.serialize(() => {
    db.all(`SELECT * FROM trials WHERE patientid=${parseInt(req.params.patientID)};`, (err, rows) => {
      if (err) {
        console.error(err.message)
      }
      console.log(rows)
      res.send(rows)
    })
  })
})
router.delete('/:id', function (req, res, next) {
  console.log(req.params)
  db.serialize(() => {
    db.run(`DELETE FROM trials WHERE id=${parseInt(req.params.id)};`, (err, row) => {
      if (err) {
        console.error(err.message)
      } else {
        res.sendStatus(200)
      }
    })
  })
})

module.exports = router
