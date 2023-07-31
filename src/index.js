const express = require("express");
const mustacheExpress = require("mustache-express");
const indexRoute = require("./routes/index.js")

const app = express();
app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.use("/", indexRoute);

app.listen(8081, () => {
    console.log('Server running at http://127.0.0.1:8081/');
});