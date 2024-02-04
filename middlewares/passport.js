const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const passport = require ('passport');

const { Strategy:JWTStrategy, ExtractJwt } = require ('passport-jwt');

const fromAuthHeaderBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken;
const jwtStrategy = new JWTStrategy(
    {
    jwtFromRequest: fromAuthHeaderBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
},
async (payload, done) => {
    try{
        if (Date.now() > payload.exp) {
            return done(null, false, { message: ' Token expired'});
        }
        const user = await User.findOne({ _id: payload.sub });
        if (!user) {
            return done (null, false, { message: ' User not found'});
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}
);
const localStrategy = new localStrategy(
    async (username, password, done) => {
        try{
            const user = await User.findOne ({ username });

            if (!user || !(await bcrypt.compare(password, user.password))){
                return done (null, false, {message: 'Incorrect username or password'});
            }
            return done(null, user);
        } catch (err){
            return done(err);
        }
    }
);
module.exports = { jwtStrategy, localStrategy };