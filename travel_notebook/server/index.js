const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Elaine050816',
  database: 'travel_diary'
})

db.connect(err => {
  if (err) console.error(err)
  else console.log('MySQL 已连接')
})

app.get('/api/diary', (req, res) => {
  const { province } = req.query
  const sql = 'SELECT * FROM diary WHERE province = ? ORDER BY time DESC'

  db.query(sql, [province], (err, results) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(results)
    }
  })
})

app.post('/api/diary', (req, res) => {
  const { id, province, content, time } = req.body
  const sql = 'INSERT INTO diary VALUES (?, ?, ?, ?)'

  db.query(sql, [id, province, content, time], err => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json({ success: true })
    }
  })
})

app.put('/api/diary', (req, res) => {
  const { id, content } = req.body
  const sql = 'UPDATE diary SET content = ? WHERE id = ?'

  db.query(sql, [content, id], err => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json({ success: true })
    }
  })
})

app.delete('/api/diary/:id', (req, res) => {
  const { id } = req.params
  const sql = 'DELETE FROM diary WHERE id = ?'

  db.query(sql, [id], err => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json({ success: true })
    }
  })
})


app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
