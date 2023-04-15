/* Import dependencies */
const express = require("express");
const app = express();
const port = 3000;

const mysql = require("mysql2");

/* Create express instance */

/* Setup database connection */
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST || "localhost",
  user: "user",
  password: "password",
  database: "world",
});

//set view engine to pug
app.set("view engine", "pug");
app.use(express.static("static"));

/* Landing route */
app.get("/", (req, res) => {
  res.render("index.pug");
});
app.get("/aboutus", (req, res) => {
  res.render("aboutus.pug");
});
app.get("/population", (req, res) => {
  res.render("population.pug");
});


// Sample API route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Returns an array of cities from the database
app.get("/cities", (req, res) => {
  db.execute("SELECT * FROM city WHERE CountryCode = 'NLD'", (err, rows, fields) => {
    console.log(`/cities: ${rows.length} rows`);
    return res.send(rows);
  });
});

// Run server!
app.listen(port, () => {
  console.log(`Server running on port ${port} yay`);
});