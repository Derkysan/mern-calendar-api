// host + /api/auth

const { Router } = require('express');
const router = Router();

const { register, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { fieldsValidations } = require('../middlewares/fieldsValidation');
const { validateJWT } = require('../middlewares/validateJwt');

// register
router.post('/register', [
  check('name', 'name is required').not().isEmpty(),
  check('email', 'email is required').isEmail(),
  check('password', 'password must be 6 character').isLength({ min: 6 }),
  fieldsValidations
],register)

// login
router.post('/login', [
  check('email', 'email is required').isEmail(),
  check('password', 'password is required').not().isEmpty(),
  fieldsValidations
],login)

// renew token
router.get('/renew', validateJWT, renewToken)

module.exports = router;