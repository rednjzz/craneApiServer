const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const passport = require('passport');

const { Post, Hashtag, User } = require('../models');
// const { isLoggedIn } = require('./middlewares');
const router = express.Router();

fs.readdir('uploads', (err) => {
  if (err) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다');
    fs.mkdirSync('uploads');
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 500 * 1024 * 1024},
});

router.post('/img', passport.authenticate('jwt', {session: false}), upload.single('img'), (req, res) => {
  //console.log(req.file);
  // if (err) {
  //   res.status(500).json({
  //     code: 500,
  //     message: '업로드 실패',
  //   })
  // }
  res.status(200).json({
    code: 200,
    message: '파일 업로드 성공',
    url: `/img/${req.file.filename}`});
});

const upload2 = multer();
router.post('/', passport.authenticate('jwt', {session: false}), upload2.none(), async(req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      userId: req.user.id,
    });
    const hashtags = req.body.content.match(/#[^\s]*/g);
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
        where: { title: tag.slice(1).toLowerCase() },
      })));
      await post.addHashtags(result.map(r => r[0]));
    }
    res.status(200).json({
      code: 200,
      message: '짹짹 성공',
      content: req.body.content
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  // if (!query) {
  //   return res.redirect('/');
  // }
  try {
    const hashtag = await Hashtag.findOne( { where: { title: query }});
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts( { include: [{ model: User }]})
    }
    res.status(200).json({
      code: 200,
      user: req.user,
      twits: posts,
    })
    // return res.render('main', {
    //   title: `${query} | NodeBird`,
    //   user: req.user,
    //   twits: posts,
    // })
  } catch (err) {
    console.error(err);
    return next(err);
  }
})

module.exports = router;