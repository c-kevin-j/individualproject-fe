const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'socialmediadb',

})

app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO user (first_name, last_name, email, password, profile_picture, bio, verified_status) VALUES ('Kaguya', 'sama', 'kaguya@sama.com', 'pass', 'prf', 'bio', 1);"
    db.query(sqlInsert, (err, result) => {
        res.send("hello ehe k");
        console.log(err)
    })
})

app.listen(3001, () => {
    console.log('run on port 3001')
})