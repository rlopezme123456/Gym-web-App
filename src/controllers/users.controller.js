const usersCtrl = {};

const passport = require('passport')

const User = require('../models/User');


usersCtrl.rendeerSignUpForm = (require,res) =>{
    res.render('users/signup');
}

usersCtrl.signup = async (req,res) => {
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({ text: 'las contraseñas no coinciden' })
    }
    if(password.length < 8){
        errors.push({text: ' la contraseña como minimo debe tener 8 caracteres'})
    }
    if(errors.length > 0){
        res.render('users/signup', {
            errors,
            name,
            email,
        })
    }else{
        const emailUser= await User.findOne({email:email});
        if(emailUser){
            req.flash('error_msg', 'el correo digitado ya se encuentra en uso')
            res.redirect('/users/signup');
        }else{
            const newUser = new User({name,email,password})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('success_msg', 'usuario ha sido registrado')
            res.redirect('/users/signin');
        }
    }
};

usersCtrl.rendeerSigninForm = (require,res) =>{
    res.render('users/signin');
}

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes/',
    failureFlash:true
});

usersCtrl.logout = (req,res) => {
    req.logout();
    req.flash('success_msg','session finalizada')
    res.redirect('/users/signin');
}

module.exports = usersCtrl;