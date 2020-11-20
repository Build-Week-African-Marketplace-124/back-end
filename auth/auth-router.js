const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = require('../models/users-model');
const router = require('../routes/items-router');

router.post('/register', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).json({ message: 'Missing username or missing password' });
  } else {
    const username = req.body.username;

    const duplicateUser = users.findBy({ username });

    if (duplicateUser.length > 0) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      let user = req.body;
      const hash = bcrypt.hashSync(user.password, 10);
      user.password = hash;
      users.addNewUser(user).then((newUser) => {
      const token = generateToken(newUser);
      res.status(200).json({ message: 'User created' ,token});})
          .catch(err => {res.status(500)
          .json(error);})
    }
  }
});

router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).json({ message: 'Missing username or missing password' });
  } else {
      let { username, password } = req.body;
      
      users.findBy({ username }).first().then((username) => {
        if (username && bcrypt.compareSync(password, username.password)) {
          // generate token
          const token = generateToken(username);
          delete username.password;
          res.status(200).json({
            username,
            token, //return the token upon login
          });
        } else {
          res.status(401).json({ message: "Invalid Username or Password" });
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
      if (username.length === 0) {
        return res.status(401).json({
          message: 'invalid credentials',
        });
      }
  }
});

router.get('/logout', (req, res) => {
  try{
  res.clearCookie('token').end();
  } catch(err) {
    next(err)
  }
});


function generateToken(user) {
  const payload = {
    subject: user.id, // standard claim = sub
    username: user.email,
  };
  const options = {
    expiresIn: "7d",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}


module.exports = router;