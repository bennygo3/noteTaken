const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs")

const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

//routing
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// Lazy way, don't judge
// app.get("/api/notes", (req, res) => {
//     res.json(db)
// })

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if(err) throw err;
        const dbInfo = JSON.parse(data)
        res.json(dbInfo)
    })
})

//POST

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, (err) => {
    if(err) throw err;
    console.log("runningin the 90s")
})