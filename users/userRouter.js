const express = require('express'); // importing a CommonJS module

const router = express.Router();
const UserDb = require('./userDb.js');
const PostDb = require('../posts/postDb');


router.use((req,res,next)=> {
  console.log('userRouter yippee');
  next();
})

// custom middleware
const logger = require('../middleware/logger'); 
router.use(logger);


// endpoints
// api/users
router.post('/', validateUser, async (req, res) => {
    try {
      const user = await UserDb.insert(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      next(({message: 'Error getting the posts for the user'}));
    }
  });

  // using PostDb
router.post('/:id/posts', validatePost, async (req, res) => {
    const postInfo = { ...req.body, user_id: req.params.id };

    try {
      const post = await PostDb.insert(postInfo);
      res.status(210).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'missing post data',
      });
    }
});

router.get('/', async (req, res) => {
    try {
      const users = await UserDb.get(req.query);
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      next(({message: 'Error retrieving the users Greg'}))
    }
  });

router.get('/:id', validateUserId, async (req, res) => {
    try {
        const user = await UserDb.getById(req.params.id);
    
        if (user) {
          res.status(200).json(user);
        } else {
        next(({message: 'user not found'}))
        }
      } catch (error) {
        console.log(error);
        next(({message: 'Error retrieving the user'}))
      }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
   
    try {
        const posts = await UserDb.getUserPosts(req.params.id);
    
        res.status(200).json(posts);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'Error getting the messages for the hub',
        });
      }
   
});

router.delete('/:id', validateUserId, async (req, res) => {
    try {
        const count = await UserDb.remove(req.params.id);
        if (count > 0) {
          res.status(200).json({ message: 'The user has been nuked' });
        } else {
          res.status(404).json({ message: 'The user could not be found' });
        }
      } catch (error) {
        console.log(error);
        next(({message: 'Error removing the user'}));
      }
});

router.put('/:id', validateUser, validateUserId, async (req, res) => {

    try {
        const user = await UserDb.update(req.params.id, req.body);
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'The user could not be found' });
        }
      } catch (error) {
        console.log(error);
        next(({message: 'Error updating the user'}));
      }

});

//custom middleware

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
        next(({message: 'failed to process async request'}));
    //   res.status(500).json({message:'failed to process async request'})
    } 
  
  }

function validateUser(req, res, next) { // post and put requests before async
    
    if (req.body && Object.keys(req.body).length) {
    next();
    } else {
    next(({message: 'missing user data'}));
    }
}

function validatePost(req, res, next) {

    if (req.body && Object.keys(req.body).length) {
        next();
        } else {
        next(({message: 'missing required text field"'}));
        }
};

module.exports = router;
