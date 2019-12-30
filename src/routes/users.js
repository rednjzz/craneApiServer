const express = require('express');
const passport = require('passport');

const { User } = require('../models');

const router = express.Router();

router.post('/:id/follow',passport.authenticate('jwt', {session: false}) , async (req, res, next) => {
  try { 
    const user = await User.findOne( { where: { id: req.user.id }});
    await user.addFollowing(parseInt(req.params.id, 10));
    res.send('success');
  } catch (err) {
    console.error(err);
    return next(err);
  }
})

module.exports = router;