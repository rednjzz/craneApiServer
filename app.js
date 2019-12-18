const express = require('express');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
require('dotenv').config();
const cors = require('cors');

const { sequelize } = require('./models');
const passportConfig = require('./passport');

const apiRouter = require('./routes/api');
const postRouter = require('./routes/post');
const usersRouter = require('./routes/users');

const app = express();
sequelize.sync();
passportConfig(passport);

app.set('port', process.env.PORT || 9001);

app.use(cors());
app.use(logger('dev'));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
 
app.use('/api', apiRouter);
app.use('/post', postRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {  //에러 생성
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
})
app.use((err, req, res, next) => { //에러 처리 (브라우져에 에러 내용 출력)
  res.status(err.status || 500);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
