/*
    SETUP
*/

// Express
var express = require("express");
var app = express();
PORT = 3000;

// Database
var db = require("./database/db-connector");

/*
    ROUTES
*/
app.get("/", function (req, res) {
  // Define our queries
  query1 = "DROP TABLE IF EXISTS diagnostic;";
  query2 =
    "CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);";
  query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
  query4 = "SELECT * FROM diagnostic;";

  // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

  // DROP TABLE...
  db.pool.query(query1, function (err, results, fields) {
    // CREATE TABLE...
    db.pool.query(query2, function (err, results, fields) {
      // INSERT INTO...
      db.pool.query(query3, function (err, results, fields) {
        // SELECT *...
        db.pool.query(query4, function (err, results, fields) {
          console.log(err);
          // Send the results to the browser
          let base = "<h1>MySQL Results:</h1>";
          res.send(base + JSON.stringify(results));
        });
      });
    });
  });
});

app.get("/:tableName", function (req, res) {
  // Define our queries
  var tableName = req.params.tableName;
  var query1 = "SELECT * FROM ??;";
  db.pool.query(query1, [tableName], function (err, results, fields) {
    console.log(results);
    res.send(JSON.stringify(results));
  });
});
/*
    LISTENER
*/
app.listen(PORT, function () {
  console.log(
    "Express started on http://localhost:" +
      PORT +
      "; press Ctrl-C to terminate."
  );
});