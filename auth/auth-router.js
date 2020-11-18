const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const secrets = require('../secrets')

const Users = require('../models/users-model')


<<<<<<< HEAD
    const duplicateUser = await users.findBy({ username });

    if (duplicateUser.length > 0) {
      res.status(400).json({ message: 'User already exists' });
=======

router.post('/register', (req,res)=>{
  console.log("crazy")
    const credentials = req.body
    if(credentials){
        const rounds = process.env.BCRYPT_ROUNDS || 12;

        const hash = bcryptjs.hashSync(credentials.password, rounds)
        credentials.password = hash

        Users.add(credentials)
        .then( user => {
            res.status(201).json({ data: user})
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        } )
>>>>>>> 6740ab0e3bb111424f719481d0083efe8ec14032
    } else {
        res.status(400).json({
            message: "Please provide username and password, the password should ne alphanumeric"
        })

    }
})

router.post('/login', (req,res)=>{
    const {username , password} = req.body
    if(req.body){
        Users.findBy({username : username})
        .then(([user]) =>{
            if(user && bcryptjs.compareSync(password, user.password)){
                const token = signToken(user)
                res.status(200).json({message: 'Welcome to our API', token})
            }else {
                res.status(401).json({message: "Invalid credentials"})
            }
        })
        .catch( err =>{
            res.status(500).json({
                message: err.message
            })
        })
    }else{
        res.status(400).json({
            message: "please provide username and password and the password should be alphanumeric",
          });
    }
})



function signToken(user){

const payload = {
    subject: user.id,
    username: user.username,
    department: account.department
}

const secret = secrets.jwtSecret

const options = {
    expiresIn: '1day',
}

    return jwt.sign(payload, secret, options)
}



module.exports = router; 