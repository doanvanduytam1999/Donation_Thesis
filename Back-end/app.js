const express = require('express');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const flash = require('connect-flash');
var session = require('express-session');
const xss = require('xss-clean');

const HomeRouter = require('./routes/homeRouter');

const AppError = require('././utils/appError');

const cookieParser = require('cookie-parser');




const app = express();

// Middlewares 

//Set security HTTP Headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(mongoSanitize());


app.use(cookieParser());
app.use(
    session({
        secret: 'my secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());
app.use(cors());
app.options('*', cors());
app.use(xss());


app.use(express.static(path.join(__dirname, 'public')));


app.use('/', HomeRouter);


//Catch 404 Erros and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

//Error handler function
app.use(() => {
    const error = app.get('env') === 'development' ? err : {};
    const status = error.status || 500;

    //res to client
    res.status(status).json({
        error: {
            Message: error.Message
        }
    })
})

//CSP
app.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'none' https://apis.google.com");
    return next();
});


/* app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}); */

app.use(cors());
app.options('*', cors());
//app.use(globalErrorHandler);




module.exports = app;
