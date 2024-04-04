const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "public/imgs"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no válido. Solo se permiten archivos jpg y png.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, 
    fileFilter: fileFilter
});

app.post("/upload/files", upload.single('file'), (req, res) => {
    // Check if file was uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const responseData = {
        success: true,
        file: {
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size
        }
    };

    res.status(200).json(responseData);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
