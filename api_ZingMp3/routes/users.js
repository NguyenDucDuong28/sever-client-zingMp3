// URL: http://localhost:3000/users
const express = require('express');
const router = express.Router();
const UserSchema = require('../schema/UserSchema');

const  UsersController = require('../controllers/Users.Controller');
// improt thư viên 

/**
 * Lấy danh sách người dùng trong db
 * URL: GET http://localhost:3000/users
    */
router.get('/',UsersController.GetUser)

/**
 * Thêm mới user
 * URL: POST http://localhost:3030/users
 */
router.post('/',UsersController.PostUser) ;


// đăng Nhập Tài Khoản
// post http://localhost:3000/users/login

router.post('/login', UsersController.LoginUser) ;
 

// Đổi Mật Khẩu 
// PUT :  http://localhost:3000/users/change-password
// body : { email , password, nePassword}

router.put('/change-password', UsersController.PutUser )

// xóa  dữ liệu trong db
router.delete('/:id', UsersController.DeleteUser)



// lấy lại mật khẩu
router.post('/Forgot-password',UsersController.sendMail)


module.exports = router;


// CRUD: Create, Read, Update, Delete
