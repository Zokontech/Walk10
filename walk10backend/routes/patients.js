const express = require('express')
const router = express.Router()
const db = require('../db')
/* GET users listing. */
function quote (string) {
  return "'" + string + "'"
}
router.post('/', function (req, res, next) {
  console.log(req.body)
  if (req?.body?.name === undefined || req?.body?.address === undefined || req?.body?.birthday === undefined) {
    res.send('missing required params')
  } else {
    db.serialize(() => {
      const command = `INSERT INTO patients 
        (name, ${req.body.phone !== undefined ? 'phone,' : ''}  ${req.body.email !== undefined ? 'email,' : ''}  address, birthday)
        VALUES(${quote(req.body.name)}, 
        ${req.body.phone !== undefined ? quote(req.body.phone) + ', ' : ''}
        ${req.body.email !== undefined ? quote(req.body.email) + ', ' : ''} 
        ${quote(req.body.address)}, 
        date(${quote(req.body.birthday)}));`

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
router.get('/', function (req, res, next) {
  db.serialize(() => {
    db.all('SELECT * FROM patients;', (err, rows) => {
      if (err) {
        console.error(err.message)
      }
      console.log(rows)
      res.send(rows)
    })
  })
})
router.get('/:patientID', function (req, res, next) {
  console.log(req.params)
  db.serialize(() => {
    db.get(`SELECT * FROM patients WHERE id=${parseInt(req.params.patientID)};`, (err, row) => {
      if (err) {
        console.error(err.message)
      }
      if (row === undefined) {
        res.sendStatus(404)
      } else {
        console.log(row)
        res.send(row)
      }
    })
  })
})
router.delete('/:patientID', function (req, res, next) {
  console.log(req.params)
  db.serialize(() => {
    db.run(`DELETE FROM patients WHERE id=${parseInt(req.params.patientID)};`, (err, row) => {
      if (err) {
        console.error(err.message)
      } else {
        res.sendStatus(200)
      }
    })
  })
})
router.put('/:patientID', function (req, res, next) {
  console.log('hello? mr. obama')
  if (req?.params?.patientID === undefined || req?.body?.name === undefined || req?.body?.address === undefined || req?.body?.birthday === undefined) {
    res.send('missing required params')
    console.log('here?')
  } else {
    db.serialize(() => {
      const command = `UPDATE patients 
        SET name=${quote(req.body.name)}, 
        ${req.body.phone !== undefined ? `phone=${quote(req.body.phone)}, ` : ''} 
        ${req.body.email !== undefined ? `email=${quote(req.body.email)}, ` : ''}
        address=${quote(req.body.address)},
        birthday=date(${quote(req.body.birthday)})
        WHERE id=${req.params.patientID};`

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
module.exports = router
