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
  port: "3306"
});

//set view engine to pug
app.set("view engine", "pug");
app.use(express.static("static"));

/* Landing route */



// Sample API route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Returns an array of cities from the database
app.get("/cities", (req, res) => {
   db.execute("SELECT * FROM city LIMIT 30", (err, rows, fields) => {
    console.log(`The length od cities table is: ${rows.length}`);
    return res.render("cities", {'rows': rows});
   });
});

// Run server!
app.listen(port, () => {
  console.log(`Server running on port ${port} yay`);
});