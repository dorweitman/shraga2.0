import { Router } from 'express';

const router = Router();

router.get('/setCallback/:callbackURL', (req, res) => {
    const { callbackURL } = req.params;
    const { SignInSecret, useEnrichId, useADFS, RelayState } = req.query;

    if (callbackURL) {
        res.cookie('callbackURL', callbackURL);
    }

    if (SignInSecret) {
        res.cookie('SignInSecret', SignInSecret);
    }

    if (useEnrichId) {
        res.cookie('useEnrichId', useEnrichId);
    }

    if (useADFS) {
        res.cookie('useADFS', useADFS);
    }

    if (RelayState) {
        res.cookie('RelayState', RelayState);
    }

    return res.status(200).redirect('/auth/saml');
});

export default router;
