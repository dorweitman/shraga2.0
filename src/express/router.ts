import path from 'path';
import { Router } from 'express';
import expressSession from 'express-session';
import passport from 'passport';

import passportConfiguration from '../passport';
import session from './session';
import auth from './auth';

const configureSession = () => {
    const sessionConfiguration = {
        secret: '124',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
    };

    return sessionConfiguration;
};

const appRouter = Router();

passportConfiguration();
appRouter.use(expressSession(configureSession()));
appRouter.use(passport.initialize());
appRouter.use(passport.session());

appRouter.use('/', session);
appRouter.use('/auth', auth);

appRouter.get('/metadata.xml', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../../assets/metadata.xml'));
});

appRouter.use('/isAlive', (_req, res) => {
    res.status(200).send('alive');
});

appRouter.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
});

export default appRouter;
