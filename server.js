const express = require("express");
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// `GET *` should return the `index.html` file.
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// `GET /notes` should return the `notes.html` file.
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// listening 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);