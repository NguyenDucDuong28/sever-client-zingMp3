// khai báo các thư viện cần dùng
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
// import thư viện mongoose
const mongoose  = require('mongoose');
// import các schema (bảng) của ứng dụng
// chú ý thứ tự import
require('./schema/UserSchema');
require('./schema/SongSchema');
require('./schema/BannerSchema');



// import các route (đường dẫn) của ứng dụng
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const songRouter = require('./routes/song');
const bannerRouter = require('./routes/banner')



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// cấu hình cors
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// tạo kết nối database
mongoose.connect('mongodb://127.0.0.1:27017/zingmp3?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));


// http://localhost:3000/
// định nghĩa các route (đường dẫn) của ứng dụng
// http://localhost:3000/
app.use('/', indexRouter);
// http://localhost:3000/users
app.use('/users', usersRouter);
// http://localhost:3000/products
app.use('/song', songRouter);
// http://localhost:3000/banner
app.use('/banner', bannerRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error 500 handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;

