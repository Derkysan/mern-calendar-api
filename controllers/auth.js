const { generateJWT } = require("../helpers/generateJwt");
const User = require("../models/user");
const bcrypt = require('bcrypt');

// register
const register = async (req, res) => {

  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email });
    if ( user ) {
      return res.status(400).json({
        ok: false,
        msg: `user email: ${email} already exist`
      })
    }

    user = new User(req.body);

    // encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );
    
    // save user
    await user.save();

    // generate jwt
    const token = await generateJWT( user._id, user.name );
    
    res.status(201).json({
      ok: true,
      uid: user._id,
      name: user.name,
      token
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'There was an error, contact the administrator'
    })
  }

}

// login
const login = async (req, res) => {

  const { email, password } = req.body;

  try {

    // confirm email
    const user = await User.findOne({ email });
    if ( !user ) {
      return res.status(400).json({
        ok: false,
        msg: `There is no user with the email ${ email }`
      })
    }
    
    // confirm password
    const validPassword = bcrypt.compareSync( password, user.password );

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: `invalid password`
      })
    }

    // generate jwt
    const token = await generateJWT( user.id, user.name );

    res.status(201).json({
      ok: true,
      uid: user._id,
      name: user.name,
      token
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'There was an error, contact the administrator'
    })
  }

 
}

// renew token
const renewToken = async(req, res) => {

  const uid = req.uid;
  const name = req.name;

  // generate token
  const token = await generateJWT( uid, name );

  res.json({
    ok: true,
    msg: 'renew token',
    uid,
    name,
    token
  })
}

module.exports = {
  register,
  login,
  renewToken,
}