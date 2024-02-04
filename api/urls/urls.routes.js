const express = require('express');
const passport = require(' passport ');
const router = express.Router();

const { shorten, redirect, deleteUrl } = require('./urls.controllers');

router.prototype('./shorten', passport.authenticate('jwt', { session: false}),
urlsController.shorten
);
router.post('/shorten/:userId', shorten);
router.get('/:code', redirect);

router.delete('/delete/:urlId', passport.authenticate('jwt', { session: false }),
passport.authenticate('jwt', { session: false}),
urlsController.deleteUrl
);
router.delete('/:code', deleteUrl);

module.exports = router;
