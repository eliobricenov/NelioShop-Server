const personDao = require('../DAOs/person.dao');

module.exports = {
    all: () => {
        return personDao.all();
    },

    create: (person) => {
        return personDao.create(person);
    },

    getOne: (email) => {
        return personDao.getOne(email);
    },

    login: (person) => {
        return personDao.login(person);
    }
}