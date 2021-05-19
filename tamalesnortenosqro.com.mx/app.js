
const express = require('express');
const app = express();

const rutasTamales = require('./routes/tamales');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'sjfgsosaoaudfgndalsagkj',
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

//Middleware

app.use('/', rutasTamales);
app.use('/registro', rutasTamales);
app.use('/login', rutasTamales);
app.use('/inicio', rutasTamales);
app.use('/compra01', rutasTamales);
app.use('/compra02', rutasTamales);
app.use('/compra03', rutasTamales);
app.use('/compra04', rutasTamales);

app.use((request, response, next) => {
    console.log('Error 404');
    response.status(404);
    response.send('Lo sentimos, página no encontrada');
});


app.listen(3000);