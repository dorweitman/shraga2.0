import { Router } from 'express';
import nJwt from 'njwt';
import passport from 'passport';

const router = Router();

router.get('/saml', passport.authenticate('saml'), (_req, res) => {
    res.redirect('/');
});

const dealWithCallback = async (req, res) => {
    const { user: enrichedUser } = req;

    const { RelayState } = req.cookies;
    if (RelayState) {
        enrichedUser.RelayState = RelayState;
    }

    const jwt = nJwt.create(enrichedUser, Buffer.from(req.cookies.SignInSecret, 'base64'));
    res.cookie('jwtUserCreds', jwt.compact());

    return res.redirect(307, `${req.cookies.callbackURL}/?jwt=${jwt.compact()}`);
};

router.post('/saml', passport.authenticate('saml'), dealWithCallback);

export default router;
