/* Import dependencies */
const express = require("express");
const mysql = require("mysql2");

/* Create express instance */
const app = express();
const port = 3000;

/* Setup database connection */

/* Landing route */
app.get("/", (req, res) => {
  res.send("Hello sir!");
});


// Run server!
app.listen(port, () => {
  console.log(`Server running`);
});
