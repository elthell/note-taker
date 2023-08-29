const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
notes.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file,
// and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved
// (look into npm packages that could do this for you).
notes.post("/notes", (req, res) => {
  // destructure
  console.log(req.body);
  const { title, text } = req.body;

  // if both properties are there make a new note with id
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    // read prev files
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);
        // write file
        fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), (err) =>
          err ? console.error(err) : console.log("Note added!")
        );
      }
    });
  } else {
    res.json("Error in adding note");
  }
  res.redirect("/notes");
});

// `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note,
// you'll need to read all notes from the `db.json` file, remove the note with the given `id` property,
// and then rewrite the notes to the `db.json` file.
// notes.delete("/api/notes/:id", (req, res) => {});

module.exports = notes;
