const db = require('../models/users-model.js');
const router = require('express').Router();
const auth = require('../middleware/authenticate-middleware.js');
const restricted = require('../auth/restricted-middleware')

router.get('/', restricted ,(req,res)=>{
  db.findBy({department: req.jwt.department})
  .then(users => {
      res.status(200).json({data: users})
  })
})

//Getting all users

router.get('/', async (req, res, next) => {
  try {
    res.json(await db.find());
  } catch (err) {
    next(err);
  }
});

//Getting a specific user

router.get('/:id', async (req, res, next) => {
  try {
    const user = await db.findById(req.params.id);
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



// //Updating a user

router.put('/:id', auth(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req.body;
    const userToUpdate = await db.update(id, user);

    if (userToUpdate) {
      res.json(user);
    } else {
      return res.status(404).json({
        message: 'User not found.',
      });
    }
  } catch (err) {
    next(err);
  }
});

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
    const user = await db.remove(id).where({ id: req.params.id }).del();

    return res.status(200).json({ id: req.params.id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
