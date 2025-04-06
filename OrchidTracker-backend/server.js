const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Ensure 'images' folder exists
const imageDir = "images";
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint for image upload
app.post("/upload", upload.single("image"), (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).send(req.fileValidationError);
  }

  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const { name, price, stock, stems, pot_size } = req.body;
  if (!name || !price || !stock || !stems || !pot_size) {
    return res.status(400).send("Missing required fields");
  }

  const imageUrl = `images/${req.file.filename}`;

  const orchidData = {
    name,
    price,
    stock,
    stems,
    pot_size,
    image_url: imageUrl,
  };

  const query =
    "INSERT INTO orchids (name, price, stock, stems, pot_size, image_url) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, Object.values(orchidData), (err, results) => {
    if (err) {
      return res.status(500).send("Database query error");
    }
    res.json({
      message: "Orchid added successfully!",
      orchidId: results.insertId,
    });
  });
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
  } else {
    console.log("Connected ✅");
  }
});

// Set up a simple route for testing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Set up an endpoint to test the DB connection
app.get("/orchids", (req, res) => {
  db.query("SELECT * FROM orchids", (err, results) => {
    if (err) {
      res.status(500).send("Database query error");
      return;
    }
    res.json(results);
  });
});

//TEST
app.get("/test", (req, res) => {
  res.json({ message: "Backend is connected!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
