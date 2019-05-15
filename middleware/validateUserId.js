async function validateUserId(req,res,next) {
    try{
      const { id } = req.params;
      const user = await Users.getById(id);
      if(user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({message: 'invalid user id'});
      }
    } catch (err) {
      res.status(500).json({message:'failed to process request'})
    } 
  
  }

  module.exports = validateUserId