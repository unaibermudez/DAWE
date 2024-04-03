const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();

// Define the path to the public folder
const publicPath = path.join(__dirname, "public");

// Serve static files from the public folder
app.use(express.static(publicPath));

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "public/imgs"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = function (req, file, cb) {
    // Accept only jpg and png files
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // Error if file format is not correct
        cb(new Error('Formato de archivo no válido. Solo se permiten archivos jpg y png.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: fileFilter
});

// Handle file uploads
app.post("/upload/files", upload.single('file'), (req, res) => {
    // Check if file was uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Prepare response data
    const responseData = {
        success: true,
        formData: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        },
        files: {
            file: `/imgs/${req.file.filename}`
        }
    };

    // Send response
    res.status(200).json(responseData);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
