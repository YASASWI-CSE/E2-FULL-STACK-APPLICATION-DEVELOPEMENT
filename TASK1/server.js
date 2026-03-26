const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "student_db"
});

db.connect(err => {
    if (err) {
        console.log("DB Connection Failed");
    } else {
        console.log("Connected to MySQL");
    }
});

// API to insert data
app.post("/register", (req, res) => {
    const { name, email, dob, department, phone } = req.body;

    const sql = "INSERT INTO students (name, email, dob, department, phone) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [name, email, dob, department, phone], (err, result) => {
        if (err) {
            res.send("Error saving data");
        } else {
            res.send("Registration Successful!");
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
