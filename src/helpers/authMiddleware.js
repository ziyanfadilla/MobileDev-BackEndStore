const jwt = require ('jsonwebtoken');

module.exports = {

    checkLogin : (req,res,next) => {
            const bearerToken  = req.header('x-access-token');
            if(!bearerToken){
                res.status (401).send({
                    msg: "cant access",
                    status : 401,
                    error : 'you must be logged'
                });

            }else{
                const token = bearerToken.split(" ")[1];
                try {
                    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
                    req.decodedToken = decodedToken
                    next();
                    
                } catch (error) {
                    res.status(401).send({
                        msg: 'cant Access',
                        status : 401,
                        error : 'invalid token'
                    });
                }
                
            }
    }
}