const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new localStrategy({
        usernameField : 'email',
        passwordField : 'password',
    }, async(email, password, done) => {
        try {
            const exUser = await User.find({ where : { email }});
            if (exUser) {
                //비밀번호 검사
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message : '이메일-비밀번호 조합이 맞지 않습니다.' });
                }
            } else {
                done(null, false, { message : '이메일-비밀번호 조합이 맞지 않습니다.' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};