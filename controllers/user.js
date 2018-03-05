const UserModel = require("../models/user");
const md5 = require("md5");
const User = {
    /**
     * 登录
     */
    login: (req, res, next) => {
        // res.json(
        //     {"MD5":md5("123456")}
        // )
        res.render('login');
    },
    doLogin:(req, res, next)=>{
        let username = req.body.username;
        let password = req.body.password;
        UserModel.find({username:username}).then(doc=>{
            if(doc){
                let user = doc;
                if(user.password == md5(password)){
                    res.redirect('/');
                }else{
                    res.redirect('users/login');
                }
            }else{
                res.redirect('users/login');
            }
        })
    },
    /**
     * 登出
     */
    logout: () => {

    },
    /**
     * 更新信息
     */
    update: () => {

    },

    
    /**
     * 修改密码
     */
    updatePassword: () => {

    }
}
module.exports = User;