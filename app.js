const exprees = require('express'),
    app = exprees(),
    mongoose = require('mongoose'),
    morgan = require('morgan');

// database connection
mongoose.connect('mongodb://127.0.0.1:27017/storeapi');
const db = mongoose.connection;
db.on('error', () => console.error('Connection Failed'))
db.once('open', () => console.log('Connection Success'))
// use morgan
app.use(morgan('dev'))
app.use(exprees.urlencoded({ extended: false }))
app.use(exprees.json())

// determine app CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header',
        'Origin , X-Requestd-With , Accept , Content_type , Authorization');
    if (res.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
            'POST', 'GET', 'PATCH', 'PUT', 'DELETE')
        return res.status(200).json({})
    }
    next();
});

// define app routes
const productRouter = require('./routes/products'),
    orderRouter = require('./routes/orders');

app.use('/products', productRouter)
app.use('/orders', orderRouter)
// handle request errors
app.use((req, res, next) => {
    const error = new Error('Not Found.... Somthing Wrong!!')
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
    next();
});

// make sure server running successfully
app.use((req, res, next) => {
    res.status(200).json({
        message: "Server Running"
    })
    next();
});

// export app
module.exports = app