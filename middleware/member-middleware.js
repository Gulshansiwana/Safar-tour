const jwt = require('jsonwebtoken');

const users=require('../api/userProfile/user-model');

/// In this Add Role Authentication



const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const user = await users.findOne({
      where: {
        email:decoded.id

      }
    });
  
    if(user){
      return next();
    }
    else{
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Please authenticate' });
  }
};








module.exports = {
  authenticate,
 
};
