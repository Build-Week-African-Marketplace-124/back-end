const db = require('../models/users-model.js');
const router = require('express').Router();
const auth = require('../middleware/authenticate-middleware.js');
const restricted = require('../auth/restricted-middleware')
const Users = require('../models/users-model')

// router.get('/', restricted ,(req,res)=>{
//   db.findBy({department: req.jwt.department})
//   .then(users => {
//       res.status(200).json({data: users})
//   })
// })

//Getting all users

router.get("/", restricted, async (req, res) => {
  Users.getAllUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});


//Getting a specific user

router.get('/:id', async (req, res, next) => {
  try {
    const user = await db.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

//Updating a user

router.put(
  "/:id",
  restricted,
  verifyUserId,
  validateEditContent,

  (req, res) => {
    const id = req.params.id;
    const edit = req.body;

    Users.editUser(id, edit)
      .then((editedProfile) => {
        delete editedProfile.password;
        res.status(201).json({ editedProfile });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }
);

function validateEditContent(req, res, next) {
  if (
    req.body.password === "" ||
    req.body.password === null ||
    req.body.username === "" ||
    req.body.username === null
  ) {
    res.status(400).json({
      message: "Email, password, and username fields cannot be empty.",
    });
  } else {
    next();
  }
}

function verifyUserId(req, res, next) {
  const id = req.params.id;

  Users.getUserById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "User Not Found." });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
}

// Logging out a user

router.get("/logout", async (req, res, next) => {
	try {
		// this will delete the session in the database and try to expire the cookie,
		// though it's ultimately up to the client if they delete the cookie or not.
		// but it becomes useless to them once the session is deleted server-side.
		req.session.destroy((err) => {
			if (err) {
				next(err)
			} else {
				res.status(204).end()
			}
		})
	} catch (err) {
		next(err)
	}
})

// //Deleting a user account

router.delete('/:id', auth(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await db.deleteUser(id).where({ id: req.params.id }).del();

    return res.status(200).json({ id: req.params.id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
