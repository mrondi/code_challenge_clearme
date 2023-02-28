
const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const handleErrors = require("./middlewares/handleErrors.js");
const notFound = require("./middlewares/notFound.js");

// db config & connect
require("./db.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use(notFound);
app.use(handleErrors);

app.listen(3000, () => {
    console.log(`***** c0d3 Ch4ll3ng3 LIVE ON port --> ${3000}`)
});