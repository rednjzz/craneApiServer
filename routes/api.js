const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const uuid4 = require('uuid4');
const cors = require('cors');

const refreshTokens = {};

const router = express.Router();
router.use(cors());

router.post('/join', async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(409).json({
        code: 409,
        message: '이미 가입된 이메일 입니다'
      });
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.status(201).json({
      code: 201,
      message: '가입 완료'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      code: 500,
      message: '회원 가입 에러'
    });
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {session: false}, (authError, user, info) => {
    if (authError || !user) { // 실패시
      console.error(authError);
      return res.status(400).json({
        code: info.code,
        message: info.message,
        user: user
      });
    }
    const payLoad = {
      id: user.id,
    }
    const token = jwt.sign(payLoad, process.env.JWT_SECRET, {expiresIn: 3000});
    const refreshToken = uuid4();
    refreshTokens[refreshToken] = user.id;
    return res.json({
      code:200, 
      message:'success', 
      userId:user.id, 
      token: 'bearer ' + token,
      refreshToken: refreshToken
    })
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.post('/token', (req, res, next) => {
  const userId= req.body.userId;
  // const token = req.body.token;
  const refreshToken = req.body.refreshToken;
  if((refreshToken in refreshTokens) && (refreshTokens[refreshToken] === userId)) {
    const payLoad = {
      id: userId
    }
    const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: 3000});
    res.json({ token: 'bearer ' + token })
  }
  else {
    res.send(401);
  }
})

router.get('/logout', async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if(refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken]
  }
  res.send(204);
});

router.get('/test', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.status(200).json({
    success: 'You are authenticated with JWT', 
    user: req.user
  });
})
module.exports = router;

