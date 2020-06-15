const KakaoStrtegy = require('passport-kakao').Strategy;

const { User } = require('../models');
const passport = require('passport');

module.exports = (passport) => {
    passport.use(new KakaoStrtegy({
        clientID: process.env.KAKAO_ID,
        callbackURL : '/auth/kakao/callback',
    }, async(accessToken, refreshToken, profile, done) => {

    }))
}