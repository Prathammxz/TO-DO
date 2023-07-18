const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});
passport.use(new GoogleStrategy({
        clientID: "851211255192-pa7geo0vphaom5kcp3ss2j2psp80h2nh.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:4000/auth/callback",
        passReqToCallback: true
    },
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));