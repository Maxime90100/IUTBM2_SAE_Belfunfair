import {app} from "../server.js";
import passport from 'passport'
import session from 'express-session'
import {OAuth2Strategy} from "passport-google-oauth";
import {findUser} from "./authentication.js";

const originRequest = "http://localhost:8080/login"
export default function socialAuth(){
    const GOOGLE_CLIENT_ID = '606419346830-prkq4eqoskvqlb86tomev0q8igi879oi.apps.googleusercontent.com';
    const GOOGLE_CLIENT_SECRET = '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';
    let userProfile

    app.use(session({
        resave: false,
        saveUninitialized: true,
        secret: 'SECRET'
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, cb) {
        console.log("serializeUser")
        cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
        console.log("deserializeUser")
        cb(null, obj);
    });

    passport.use(new OAuth2Strategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            userProfile=profile;
            return done(null, userProfile);
        }
    ));

    app.get('/auth/google',
        (req, res, next) => {
            const from = req.query.from
            passport.authenticate('google', {
                scope: ['profile', 'email'],
                state: from
            })
            (req, res, next);
        }
    );

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: originRequest }),
        async function (req, res) {
            const googleUser = req.user._json
            const apiUser = await findUser(googleUser.given_name, googleUser.family_name)
            const from = req.query.state
            if(apiUser){
                console.log(googleUser)
                res.redirect(from)
            }else{
                console.log("User not found")
                res.redirect(from)
            }
        }
    );
};