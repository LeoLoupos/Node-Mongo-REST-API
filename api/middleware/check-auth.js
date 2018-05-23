//In every route we pass as many args as we want: path, ...middlewares, callback 
//from left to right every middleware runs , and if only it succeeded it continues to the next middleware
const jwt = require('jsonwebtoken');

//Verifying an incoming Token with JWT
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // split and access
        //the decode should run if only the jwt is verifiedS
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded //store data to the request , in order to inject on router
        next();        
    } catch(e) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
    
    //every last execution of a middleware should be : next() if everything is ok , otherwise Error
};