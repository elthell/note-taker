const express = require("express");
const path = require("path");
const notesRouter = require("./routes/notes");

const PORT = process.env.PORT || 3001;

const app = express();

// route for notes
app.use("/api", notesRouter);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// `GET /notes` should return the `notes.html` file.
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// `GET *` should return the `index.html` file.
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
