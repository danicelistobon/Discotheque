const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const mysqlstore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');

//inicializar la app
const app = express();
require('./lib/passport');

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
app.use(session({
    secret: 'discotheque',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}));
app.use(passport.initialize());
app.use(passport.session());

//variables globales
app.use((req, res, next) => {
    app.locals.user = req.user;
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