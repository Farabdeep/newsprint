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
app.get("/", (req, res) => {
  res.render("index.pug");
});

// Returns an array of cities from the database
app.get("/cities", (req, res) => {
   db.execute("SELECT * FROM city LIMIT 120", (err, rows, fields) => {
    console.log(`The length oF cities table is: ${rows.length}`);
    return res.render("cities", {'rows': rows});
   });
});

async function getCityById(cityId) {
  const [rows] =  await db.query('SELECT * FROM city WHERE ID = ?', [cityId]);
  return rows[0];
}

app.get("/single-city/:id", async function (req, res) {
  var cityId = req.params.id;
  // Retrieve city information from the database using the cityId
  var city = await getCityById(cityId);
  res.render('city', {city: city});
});


app.get("/aboutus", (req, res) => {
  res.render("aboutus.pug");
});

// Run server!
app.listen(port, () => {
  console.log(`Server running on port ${port} yay`);
});