const express = require("express");
const passport = require("passport");
const router = express.Router();

const { shorten, redirect, deleteUrl } = require("./urls.controllers");

// router.prototype('./shorten', passport.authenticate('jwt', { session: false}),
// urlsController.shorten
// );

//router.post('/shorten/:userId', shorten);
router.post(
  "/shorten",
  passport.authenticate("jwt", { session: false }),
  shorten
);

//router.get('/:code', redirect);
router.get("/path", (req, res) => {
  res.send("Hello from the /path route!");
});

//router.delete('/delete/:urlId', passport.authenticate('jwt', { session: false }),
router.delete(
  "/:urlId",
  passport.authenticate("jwt", { session: false }),
  deleteUrl
);

// passport.authenticate('jwt', { session: false}),
// urlsController.deleteUrl);

//router.delete('/:code', deleteUrl);

module.exports = router;
