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
const AdminRouter = require('./routes/adminRouter');
const AppError = require('././utils/appError');

const cookieParser = require('cookie-parser');

const globalErrorHandler = require('./controllers/errorController');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const nodemailer =  require('nodemailer');

const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "Libarary API",
            version: "1.0.0",
            description: "Libarary API for Donate Thesis"
        },
        server:[
            {
                url: "http://localhost:4000/"
            }
        ],
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);


const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

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

app.use(cors({
    origin: ['http://localhost:3000','http://localhost:3002','https://test-payment.momo.vn', 'https://example.com/momo_ipn', '118.69.210.244', '1.52.198.188'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));
//app.use(cors());

app.options('*', cors());
app.use(xss());


app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', HomeRouter);

app.use('/api/admin', AdminRouter)  


//CSP
app.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'none' https://apis.google.com");
    return next();
});


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);




module.exports = app;
