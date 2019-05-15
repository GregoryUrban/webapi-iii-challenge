const express = require('express'); // importing a CommonJS module

const router = express.Router();
const UserDb = require('./userDb.js');


router.use((req,res,next)=> {
  console.log('Hubs router yay');
  next();
})

// custom middleware
const logger = require('../middleware/logger'); 
router.use(logger);


// endpoints
// router.post('/', (req, res) => {

// });

router.post('/', async (req, res) => {
    try {
      const user = await UserDb.insert(req.body);
      res.status(201).json(user);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the user',
      });
    }
  });

router.post('/id/posts', validateUserId, async (req, res) => {
    const postInfo = { ...req.body, user_id: req.params.id };

    try {
        const post = await UserDb.insert(postInfo);
        res.status(210).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error getting the posts for the user'
        });
    }

});


router.get('/', async (req, res) => {
    try {
      const users = await UserDb.get(req.query);
      res.status(200).json(users);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the users Greg',
      });
    }
  });

router.get('/:id', validateUserId, async (req, res) => {
    try {
        const user = await UserDb.getById(req.params.id);
    
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'user not found' });
        }
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the user',
        });
      }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
    try {
        const posts = await UserDb.getUserPosts(req.params.id);
    
        res.status(200).json(posts);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error getting the posts for the user',
        });
      }
});

router.delete('/:id', validateUserId, async (req, res) => {

});

router.put('/:id', validateUserId, async (req, res) => {

});

//custom middleware

// function validateUserId(req, res, next) {
// };
async function validateUserId (req, res, next) {
    try{
      const { id } = req.params;
      const user = await UserDb.getById(id);
      if(user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({message: 'invalid user id'});
      }
    } catch (err) {
      res.status(500).json({message:'failed to process async request'})
    } 
  
  }

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
