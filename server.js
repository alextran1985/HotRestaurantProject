// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve-view.html"));
});


app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve-form.html"));
});
// Data
// Linking routes to "data" sources. 
// ^ Data sources hold arrays of information on table-data, waitinglist, etc.
// =============================================================
let tableData = require('./table-data');
let waitListData = []


// Data
// Linking routes to "data" sources. 
// ^ Data sources hold arrays of information on table-data, waitinglist, etc.
// =============================================================

let tableData = require('./table-data.js');
let waitListData = require('waitinglist-data.js');
// var path = require('path');

// Routing
// =============================================================

// module.exports = function (app) {

    // API *GET* Get all the reservations as JSON / api / tables

    app.get('/api/tables', function (req, res) {
        res.json(tableData);
    });

    app.get('/api/waitlist', function (req, res) {
        res.json(waitListData);
    });

    // API *POST* Send form to / api / tables

    app.post('/api/tables', function (req, res) {

        // Server responds to requests & lets users know if a table is available or not.
        if (tableData.length < 5) {
            tableData.push(req.body);
            res.json(true);             // true = have a table
        } else {
            waitListData.push(req.body);
            res.json(false); 
        }
    });

    // API * PUT* Clear the reservations / api / clear

    app.post('/api/clear', function (req, res) {
        // Empty out the arrays of data
        tableData = [];
        waitListData = [];

        console.log(tableData);
    })
// }

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});