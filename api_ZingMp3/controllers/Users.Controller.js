const UserSchema = require("../schema/UserSchema")

// improt thư viên 
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer"); 



// lấy tài khoản
const GetUser =  async function (req, res, next) {
    try {
      const users = await UserSchema.find();
      return res.json(users );
      
    } catch (error) {
          res.json({ error : error.message });
    };
  };

    // Tạo khoản
  const  PostUser =  async function (req, res, next) {
      try {
        // đọc dữ liệu từ body
        const { name, email, password } = req.body;
        // kiểm tra dữ liệu 
        // if(!name || !email || !password) {
        //   throw new Error ('Vui lòng nhập đủ dữ liêu')
        // }
        // name max 50 ký tự , min 6 ký tự
        // if(name.length >50 || name.length < 6){
        //   throw new Error('Ten Người dùng phải có 6 đến 50 ký tự');
        // }
        // bắt lỗi nên dùng biểu thức chình quy
        // email phải chưa tồn tại trong db
        const check = await UserSchema.findOne({ email});
          console.log(check);
        // select *  from users where email = 'email
        if(check){
          throw new Error('Email này đã tồn tại ' )
        } 
        // mã hóa password
        const salt = bcrypt.genSaltSync(10) // mã hóa 10 lần
        const  hashPassword = bcrypt.hashSync(password, salt); // mã hóa password
        // tạo mới users
        const user = new UserSchema({ name, email, password:hashPassword });
        console.log(user);
        // lưu vào db
        const result = await user.save();
        res.json({message: 'Tạo tài khoản thành công', result });
        console.log(result);

      }
      catch (error) {
        res.json({ error : error.message });
      }
    }


    // Đổi mật Khẩu 
 const   PutUser =  async function(req, res, next){
      try {
         const {email,password, newPassword} = req.body;
         // lấy user từ db theo email
         const user = await UserSchema.findOne({email});
         if (!user) {
          throw new Error ('Email này có tồn tại hay không')
         }
         // so sánh mật khẩu
         const check = bcrypt.compareSync(password, user.password)
         if(!check) {
          throw new Error ('Mật Khẩu  không chính xác')
         }
         // mã hóa mật khẩu mới
         const salt = bcrypt.genSaltSync(10);// mã hóa 10 lần
        const  hashPassword = bcrypt.hashSync(newPassword, salt) // mã hóa password
        // cập nhật thành công
        user.password = hashPassword;
        // lưu vào db
        const result = await user.save();
        res.json({ message:'Bạn đã đổi mật khẩu thành công',result});
      } catch (error) {
        res.json({ error : error.message });
      }
    }

      // Đăng NHập tài khoản
  const  LoginUser = async function (req, res) {
        try {
          const {email, password} = req.body;
          //lấy user từ db theo email
          const user = await UserSchema.findOne({email});
          if(!user){
            throw new  Error('Email không tồn tại')
          }
          // so sánh mật khẩu 
          const check = bcrypt.compareSync(password, user.password);
          if(!check){
            throw new Error('Mật Khẩu Không Chính Xác')
          }             
          // trả về thông tin user
          res.json({ message : 'Đăng Nhập Thành Công',  user });
          // Chuyển hướng tới trang thành công sau khi đăng nhập
          // res.redirect('/');
        } catch (error) {
          res.json({ error : error.message });
        } 
      }



      
 const   DeleteUser = async function(req, res, next){
      try {
          // lấy id
          let {id} = req.params.id;
          const result = await UserSchema.deleteOne({_id:id});
          res.json({ message: "Đã xóa thành Công" , result });
      } catch (error) {
        res.json({ error : error.message });
      }
    }


    
    



    const sendMail = async function (req, res, next) {
      const { email } = req.body;
      const password = generateRandomPassword(); // Generate a random password
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "duongxautrai321@gmail.com",
          pass: "phmklzplxqtwafzy",
        },
      });
    
      try {
        await transporter.sendMail({
          from: "duongxautrai321@gmail.com",
          to: email,
          subject: "Zing Mp3 - Reset Password",
          text: `Your new password is: ${password}`,
          html: `<b>Your new password is: ${password}</b>`,
        });
    
        // Update the user's password in the MongoDB collection
        await updatePasswordInMongoDB(email, hashedPassword);
    
        return res.json({
          message: `An email with the new password has been sent to ${email}. Please check your email.`,
        });
      } catch (error) {
        console.error(error);
        return res.json({ message: "Error sending email.", error });
      }
    };
    
    // Helper function to update user's password in MongoDB
    async function updatePasswordInMongoDB(email, hashedPassword) {
      try {
        // Assuming you have a MongoDB collection named 'users'
        await UserSchema.findOneAndUpdate({ email }, { password: hashedPassword });
        console.log(`Password updated for user with email: ${email}`);
      } catch (error) {
        console.error(`Error updating password for user with email: ${email}`);
        throw error;
      }
    }
    
    // Helper function to generate a random password
    function generateRandomPassword() {
      // Implement your logic to generate a random password (e.g., using a library)
      // For demonstration, let's use a simple random string generator
      const length = 10;
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      return password;
    }
    
    

module.exports = {GetUser , PostUser , PutUser , LoginUser , DeleteUser , sendMail};