'use strict';
import express from 'express';
import session from 'express-session';
import passport from './config/passport';
import db from './models';
import htmlRoutes from './routes/html-routes.mjs';
import apiRoutes from './routes/api-routes';
import morgan from 'morgan';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(morgan());

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static('public'));

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(apiRoutes);
app.use(htmlRoutes);

db.sequelize.sync({
    force: true
}).then(() =>
    app.listen(PORT, () =>
        console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT)
    )
);