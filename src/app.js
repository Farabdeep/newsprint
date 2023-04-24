const express = require("express");

var app = express();

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

