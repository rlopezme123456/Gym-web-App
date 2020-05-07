const {Router} = require('express');
const router = Router();

const {
    rendeerSignUpForm,
    signup,
    rendeerSigninForm,
    signin,
    logout
 } = require('../controllers/users.controller')

router.get('/users/signup', rendeerSignUpForm);

router.post('/users/signup', signup);

router.get('/users/signin', rendeerSigninForm);

router.post('/users/signin', signin);

router.get('/users/logout', logout)

module.exports = router;