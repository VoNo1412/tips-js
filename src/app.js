const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const exphbs = require('express-handlebars');
const compression = require('compression');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require("./routes/auth.routes")
const cookieParser = require('cookie-parser');


// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Setting the view engine to use handlebars
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
// init router
app.get('/', (req, res) => {
    try {
        console.log('Rendering main template...');
        res.render('layouts/main', { books });
    } catch (err) {
        console.error('Error rendering template:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Routes
app.use('/auth', authRoutes);

module.exports = app;
