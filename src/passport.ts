import passport from 'passport';
import { Strategy as SamlStrategy } from 'passport-saml';

import { ADUser } from './interface';
import config from './config';

const { saml: samlConfig } = config;

const configurePassport = () => {
    passport.serializeUser((user, done) => {
        const userForSession = user as ADUser;

        return done(null, userForSession);
    });

    passport.deserializeUser((user: ADUser, done) => {
        return done(null, user);
    });

    const strategy = new SamlStrategy(samlConfig, (profile, done: Function) => {
        console.log(profile);
        return done(null, profile);
    });

    passport.use(strategy);
};

export default configurePassport;
