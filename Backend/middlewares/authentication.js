const jwt=require('jsonwebtoken')
const User = require('../models/User');

exports.protect=async(req,res,next)=>{
    try {
         let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return res.status(401).json({message:'Invalid Token'})
    }
   const  verifyToken=await jwt.verify(token,process.env.JWT_SECURE);

   const currentUser=await User.findById(verifyToken.id).select('-password')
   if(!currentUser) return res.status(404).json({message:'User not found'})

    req.user=currentUser;
    next()

        
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
   
}
exports.admin=(req,res,next)=>{
    if(req.user && req.user.role==='admin'){
        next()
    }else{
       return  res.status(403).json({message:'Not Authorized as Admin'})

    }
    
}



 