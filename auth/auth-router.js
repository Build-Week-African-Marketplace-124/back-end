const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/authenticate-middleware');
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

      try {
        users.add(user);
        res.status(200).json({ message: 'User created' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  }
});

router.post('/login', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).json({ message: 'Missing username or missing password' });
  } else {
    try {
      const { username, password } = req.body;
      const user = users.findBy({ username });
      if (user.length === 0) {
        return res.status(401).json({
          message: 'invalid credentials',
        });
      }
      const passwordValid = bcrypt.compareSync(password, user[0].password);
      if (!passwordValid) {
        return res.status(401).json({
          message: 'Invalid credentials',
        });
      }

      const token = jwt.sign({
        userID: user.id,
        // userRole: user.role,
      }, process.env.JWT_SECRET)
  
      // this is how we set a cookie manually
      // cookies get set up with every request to persist login auth
      res.cookie("token", token)
      res.json({
        message: `Welcome ${user.username}!`,
      })
    } catch(err) {
      next(err)
    }
    //   const token = jwt.sign(
    //     {
    //       userID: user[0].id,
    //     },
    //     process.env.JWT_SECRET
    //   );

    //   res.cookie('token', token);
    //   res.status(200).json({ token, message: `Welcome ${user[0].username}` });
    // } catch (err) {
    //   next(err);
    // }
  }
});

router.get('/logout', (req, res) => {
  try{
  res.clearCookie('token').end();
  } catch(err) {
    next(err)
  }
});

module.exports = router;