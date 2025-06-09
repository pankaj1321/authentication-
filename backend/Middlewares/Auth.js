// creating a middleware for authentication using jwt token
const jwt = require('jsonwebtoken');
const IsUserAuthentcated = (req,res,next)=>{
    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).json({
            message:"unauthorized, jwt token is missing",
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message:"jwt token is wrong or unauthorized"
        })
        
    }

}
module.exports = IsUserAuthentcated;