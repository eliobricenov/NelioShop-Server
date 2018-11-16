const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
        const bearerToken = bearerHeader.split(' ');
        req.token = bearerToken[1];
        next();
    } else {
        throw {
            status: 403,
            errors: [{
                message: 'No token provided'
            }]
        }
    }
};

const generateToken = (data, secret) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ data }, secret, (err, token) => {
            if (err){
                reject(err);
            } else {
                resolve(token);
            }
        })
    });
};

const decodeToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err){
                console.log(err);
                reject({
                    status: 403,
                    errors: [{
                        message: 'Invalid Token'
                    }]
                });
            } else {
                resolve(decoded);
            }
        })
    });
};


module.exports = { verifyToken, generateToken, decodeToken }
