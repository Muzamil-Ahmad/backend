/*using tutorial in my app*/
const express = require('express');
const bodyParser = require('body-parser');

const app = express();


// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Muzamil's Application." });
});
console.log("welcome");
require("./app/routes.js")(app);
// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});




/*without express in my app*/
// console.log("Welcome to Node");
// const http = require('http');
// const server = http.createServer((req, res) => {
//     if (req.url == '/') {
//         console.log('Your app is running on browser')

//     }
//     if (req.url == '/api/courses') {
//         res.write("Hello World");
//         res.end();
//     }
// });
// server.listen(3000);


/*using express in my app*/

// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send("Welcome to express Muzamil");
// });

// app.listen(3000);