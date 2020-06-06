const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../models');

const router = express.Router();

// POST /auth/join
router.post('/join', (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.find({ Where : { email }});
        if(exUser) {
            req.flash('joinError', '이미 가입된 이메일 입니다.');
            return res.redirect('/join');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// POST /auth/login 
router.post('/login', (req, res, next) => { // req,.body.email, req.body.password
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            req.flash('loginError', info.message);
            return res.redirect('/');
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

module.exports = router;