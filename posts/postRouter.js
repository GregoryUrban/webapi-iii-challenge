const express = 'express';

const router = express.Router();
const PostDb = require('./postDb.js');

router.get('/', async (req, res, next) => {
    console.log('postRouter yippee');
    next();
});

router.get('/:id', validatePostId, async (req, res) => {
    try {
        const posts = await PostDb.get(req.query);
        res.status(200).json(posts);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the posts Greg',
        });
      }
});

router.delete('/:id', validatePostId, async (req, res) => {
    try {
        const count = await PostDb.remove(req.params.id);
        if (count > 0) {
          res.status(200).json({ message: 'The post has been nuked' });
        } else {
          res.status(404).json({ message: 'The post could not be found' });
        }
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error removing the post',
        });
      }
});

router.put('/:id', validatePostId, async (req, res) => {
    try {
        const post = await PostDb.update(req.params.id, req.body);
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: 'The post could not be found' });
        }
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error updating the post',
        });
      }
});

// custom middleware

async function validatePostId (req, res, next) {
    try{
        const { id } = req.params;
        const post = await PostDb.getById(id);
        if(post) {
          req.post = post;
          next();
        } else {
          res.status(400).json({message: 'invalid post id'});
        }
      } catch (err) {
        res.status(500).json({message:'failed to process async request'})
      } 
    
};

module.exports = router;