const bcrypt = require('bcrypt');

const hash = (pass) => {
    return new Promise((res, rej) => {
        bcrypt.hash(pass, 8)
            .then(hash => res(hash))
            .catch(err => rej(err))
    })
}

const compare = (pass, hashedPass) => {
    return new Promise((res, rej) => {
        bcrypt.compare(pass, hashedPass)
            .then(r => {
                res(r == true);
            })
            .catch(err => rej(err))
    })
}

module.exports = { hash, compare };