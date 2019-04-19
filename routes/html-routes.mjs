'use strict';
import path from 'path';
const __dirname = path.dirname(new URL(
    import.meta.url).pathname);

// Requiring our custom middleware for checking if a user is logged in
import isAuthenticated from '../config/middleware/isAuthenticated';

import express from 'express';
const router = express.Router();
router.use(express.static(path.join(__dirname, '../blocked/build/public')));
router.get('/', function (req, res) {
    if (req.user) {
        return res.redirect('/home');
    }
    res.sendFile(path.join(__dirname, '../blocked/build/index.html'));
});
router.get('/agreement', isAuthenticated.loggedIn, function (req, res) {
    res.sendFile(path.join(__dirname, '../blocked/build/index.html'));
});
router.get('/404', function (req, res) {
    res.sendFile(path.join(__dirname, '../blocked/build/index.html'));
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
var homeRouter = express.Router();
homeRouter.get([
    '/',
    '/create',
    '/answered',
    '/problem/:id'
], function (req, res) {
    res.sendFile(path.join(__dirname, '../home/build/index.html'));
});
homeRouter.get('/random', function (req, res) {
    var random = Math.floor(Math.random() * 999999) + 1;
    res.redirect('/home/problem/' + random);
});
router.use('/home', [isAuthenticated.loggedIn, isAuthenticated.acceptedAgreement, express.static(path.join(__dirname, '../home/build/public'))], homeRouter);

router.get('*', function (req, res) {
    res.redirect('/404');
});

export default router;