require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = new express();
const port = process.env.PORT || 8081;
const routes = require('./routes/routes');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

// Server
const server = app.listen(port, () => {
    console.log(`Server running in port ${port}`);
})
