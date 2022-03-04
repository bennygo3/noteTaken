const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");
const { randomUUID } = require("crypto");

const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

//routing
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})



app.get("/api/notes", (req, res) => {
    // fs.readFile("./db/db.json", (err, data) => {
    //     if(err) throw err;
    //     const dbInfo = JSON.parse(data)
    res.json(db)
    // })
});

//POST
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    newNote.id = randomUUID() 
    db.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(db, null, 4), (err) => {
        err ? console.log(err) : res.send(newNote)
    })

});

// app.delete("/api/notes/:id", (req, res) => {
//     const noteId = req.params.id;
//     res.unlink(noteId, './db/db.json')
//     res.readFile(noteId, './db/db.json')
// });

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("up and running")
})