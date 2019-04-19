'use strict';
import passport from '../config/passport';
import isAuthenticated from '../config/middleware/isAuthenticated';
import db from '../models';

import express from 'express';
const router = express.Router();

router.post('/api/login', passport.authenticate('local'), (req, res) => res.json('/home'));

router.post('/api/problem', isAuthenticated.loggedIn, isAuthenticated.acceptedAgreement, (req, res) => {
    db.Problem.create({
        imageUrl: req.body.imageUrl.replace(
            /^https?:/,
            ""
        ),
        name: req.body.name,
        description: req.body.description,
        short: req.body.short,
        hint: req.body.hint
    }, {
        userId: req.user.id
    }).then(function (dbProblem) {
        res.json('/home');
    }, function (err) {
        res.status(500).json({
            error: {
                message: "Server Error, please try again later."
            }
        });
    });
});

router.get('/api/problem', isAuthenticated.loggedIn, isAuthenticated.acceptedAgreement, (req, res) => {
    db.Problem.findAll().then(function (dbProblems) {
        console.log("problems", dbProblems);
        res.json(dbProblems);
    }, function (err) {
        console.log("err", err);
        res.status(500).json({
            error: {
                message: "Server Error, please try again later."
            }
        });
    });
});

router.get('/api/problem/:problemId', isAuthenticated.loggedIn, isAuthenticated.acceptedAgreement, (req, res) => {
    db.Problem.find({ where: { id: req.params.problemId }, include: [db.User]}).then(function (dbProblem) {
        console.log("problem", dbProblem);
        res.json(dbProblem.ViewModel());
    }, function (err) {
        console.log("err", err);
        res.status(500).json({
            error: {
                message: "Server Error, please try again later."
            }
        });
    });
});

router.put('/api/accept', isAuthenticated.loggedIn, (req, res) => {
    db.User.update({
        acceptedAgreement: true
    }, {
        where: {
            id: req.user.id
        }
    }).then(function (results) {
        var numUpdated = results[0];
        if (numUpdated) {
            req.user.acceptedAgreement = true;
            return res.json('/home');
        }
        //no rows updated, user doesn't exist, redirect to login.
        res.json('/');
    }, function (err) {
        res.status(500).json({
            error: {
                message: "Server Error, please try again later."
            }
        })
    });
})

// Route for logging user out
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Route for getting some data about our user to be used client side
router.get('/api/user_data', (req, res) => {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
    } else {
        console.log(req.user)
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json(req.user);
    }
});

export default router;