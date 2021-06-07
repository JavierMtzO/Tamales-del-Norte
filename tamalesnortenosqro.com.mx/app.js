
const express = require('express');
const app = express();

const rutasTamales = require('./routes/tamales');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const multer = require('multer');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

app.use(session({
    secret: 'sjfgsosaoaudfgndalsagkj',
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        //'uploads': Es el directorio del servidor donde se subirán los archivos 
        callback(null, 'public/img');
    },
    filename: (request, file, callback) => {
        //aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
        //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
        callback(null, new Date().toUTCString() + '_' + file.originalname);
    },
});

//En el registro, pasamos la constante de configuración y
//usamos single porque es un sólo archivo el que vamos a subir, 
//pero hay diferentes opciones si se quieren subir varios archivos. 
//'archivo' es el nombre del input tipo file de la forma
app.use(multer({ storage: fileStorage }).single('imagen'));

//Middleware

app.use('/', rutasTamales);
app.use('/registro', rutasTamales);
app.use('/login', rutasTamales);
app.use('/inicio', rutasTamales);
app.use('/compra01', rutasTamales);
app.use('/compra02', rutasTamales);
app.use('/compra03', rutasTamales);
app.use('/compra04', rutasTamales);
app.use('/perfil', rutasTamales);
app.use('/pedidos', rutasTamales);
app.use('/carrito', rutasTamales);
app.use('/admin-pedidos', rutasTamales);
app.use('/admin-editar-pedidos', rutasTamales);

app.use((request, response, next) => {
    console.log('Error 404');
    response.status(404);
    response.send('Lo sentimos, página no encontrada');
});


// app.listen(3000);
app.listen(process.env.PORT || 3000);