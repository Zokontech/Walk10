const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/patients.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message)
  }
  console.log('Connected to the patients database.')
})

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS patients 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL, 
        phone TEXT, 
        email TEXT, 
        address TEXT NOT NULL, 
        birthday TEXT NOT NULL);`, (err) => {
    if (err) {
      console.error(err.message)
    }
  })
  db.run('PRAGMA foreign_keys = ON;', (err) => {
    if (err) {
      console.error(err.message)
    }
  })
  db.run(`CREATE TABLE IF NOT EXISTS trials 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
        patientid INTEGER NOT NULL,
        distance REAL NOT NULL,
        slow1 REAL NOT NULL,
        slow2 REAL NOT NULL,
        fast1 REAL NOT NULL,
        fast2 REAL NOT NULL,
        slowspeed REAL NOT NULL,
        fastspeed REAL NOT NULL,
        assistlevel INTEGER NOT NULL,
        time TEXT NOT NULL,
        notes TEXT,
        FOREIGN KEY(patientid) REFERENCES patients(id) ON DELETE CASCADE
        );`, (err) => {
    if (err) {
      console.error(err.message)
    }
  })
})

module.exports = db
