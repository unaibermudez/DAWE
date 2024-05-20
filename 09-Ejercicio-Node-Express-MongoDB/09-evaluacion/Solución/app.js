var express = require("express");
var multer  = require('multer')

const img_path = 'public/imgs/';
const file_limit_size = 2*1024*1024;

var app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded( {extended: false}));

// Especificamos donde (ruta) y con que nombre guardar cada fichero
var storage = multer.diskStorage({	
	destination: function (req, file, cb) {
		cb(null, img_path) // ruta
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname) // nombre de fichero
	}
});

var fileFilter = function(req, file, cb) {
	var allowedMimes = ['image/jpeg', 'image/png'];

	if (allowedMimes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Invalid file type. Only jpg and png image files are allowed.'));
		console.log("Has introducido un fichero que no es .jpg o .png");
	}
};

var upload = multer({
	storage: storage,
	limits: { fileSize: file_limit_size }, 
	fileFilter: fileFilter
});

var pedido = upload.array('fileselect'); // con esta opcion de .array() le decimos que queremos subir varios ficheros

app.post('/upload/files', function (req, res) {
	// req.files contiene los archivos subidos a 'fileselect'
	// req.body contendrá el resto de campos
	console.log(req.files);
	pedido(req, res, (err) => { // llamamos al objeto pedido recien creado
		if (err) {
			console.log(err.stack);
			res.send({
				success: false, 
				error: err
			})
		}
		else{
			// en caso de éxito, devolver un objeto JSON que contenga: success:true, la ruta a los ficheros
			// subidos y los valores recibidos en cada campo del formulario POST
			console.log(req.files);
			console.log(req.files.map(file => file.path));
			res.send({
				success: true,
				"nombre": req.body.nombre,
				"telefono": req.body.telefono,
				"email": req.body.email,
				"libros": req.body.libros,
				"cantidad": req.body.cantidad,
				"files": req.files.map(file => file.path),
			});
		}	
	});
});

app.listen(3000, function() {
	console.log("Servidor lanzado en el puerto 3000");
});
