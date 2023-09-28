const express = require('express');
const app = express();
const morgan = require('morgan');

// init middleware
app.use(morgan("dev"));
// init db

// init router
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'get success'
    })
})
// handling error

module.exports = app;