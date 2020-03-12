const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//inicializar la app
const app = express();

//configuraciones que necesita el servidor express
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//variables globales
app.use((req, res, next) => {
    
    next();
});

//routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/clubs', require('./routes/clubs'));
app.use('/user', require('./routes/user'));

//public
app.use(express.static(path.join(__dirname, 'public')));

//star server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});