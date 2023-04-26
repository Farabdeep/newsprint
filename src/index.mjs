/*  Import dependencies */
import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import DatabaseService from "./services/database.service.mjs";
import session from "express-session";

/* Create express instance */
const app = express();
const port = 3000;

/* Add form data middleware */
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "verysecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Integrate Pug with Express
app.set("view engine", "pug");

// Serve assets from 'static' folder
app.use(express.static("static"));

const db = await DatabaseService.connect();
const { conn } = db;


/* Landing route */
// Sample API route
app.get("/", (req, res) => {
  res.render("index.pug");
});

// Returns an array of cities from the database
app.get("/cities", (req, res) => {
  const [rows, fields] =  db.getCities();
  /* Render cities.pug with data passed as plain object */
  return res.render("cities", { rows, fields });
});

// Gallery route
app.get("/gallery", (req, res) => {
  res.render("gallery");
});

app.get("/single-city/:id", async function (req, res) {
  var cityId = req.params.id;
  // Retrieve city information from the database using the cityId
  var city = await getCityById(cityId);
  res.render('city', {city: city});
});

async function getCityById(cityId) {
  const [rows] =  await db.query('SELECT * FROM city WHERE ID = ?', [cityId]);
  return rows[0];
}



app.get("/aboutus", (req, res) => {
  res.render("aboutus.pug");
});

// Run server!
app.listen(port, () => {
  console.log(`Server running on port ${port} yay`);
});