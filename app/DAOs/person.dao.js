const db = require('../util/db/db');
const bcrypt = require('../util/bcrypt/bcrypt');
module.exports = {

    /**
     * Searchs for the information of all the people in the database.
     * @author ebriceno
     * @returns JSON with the information of the registered people.
     */
    all: async () => {
        const data = await db.any('SELECT * FROM person');
        return data.length > 0 ? data : [];
    },

    /**
     * Inserts a new person in the database.
     * @author ebriceno 
     * @param person JSON with the information of the account to create.
     * @returns JSON with the information of the registered person.
     * @throws A new error if the email is already registered in the database.
     */
    create: (person) => {
        return db.task(async t => {
            //Check if there's a person with the provided email
            const count = await t.one('SELECT count(id) FROM person WHERE person.email = $1', [person.email]);
            if (count.count == 0) {
                const pass = await bcrypt.hash(person.password);
                return t.one(`INSERT INTO person (email, username, first_name, last_name, password) 
                    VALUES ($1, $2, $3, $4, $5) RETURNING id, email, username, first_name, last_name`,
                    [person.email, person.username, person.firstName, person.lastName, pass]);
            } else {
                throw {
                    status: 403,
                    errors: [{
                        message: 'email already linked to account'
                    }]
                }
            }
        })
    },

    /**
     * @author ebriceno
     * @description Searchs for the information of the person with the provided address. 
     * @param email Email of the account.
     * @returns Information from of the person with the provided email address.
     * @throws A new error if email is not registered in the database.
     */
    login: (person) => {
        return db.task(async t => {
            //Check if there's a person with the provided email
            const count = await t.one('SELECT count(id) FROM person WHERE person.email = $1', [person.email]);
            if (count.count > 0) {
                const data = await t.one(`SELECT * FROM person WHERE person.email = $1`, [person.email]);
                const match = await bcrypt.compare(person.password, data.password);
                if (match) {
                    return {
                        id: data.id,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        email: data.email,
                        username: data.username,
                    }
                } else {
                    throw {
                        status: 403,
                        errors: [{
                            message: 'incorrect password'
                        }]
                    }
                }
            } else {
                throw {
                    status: 404,
                    errors: [{
                        message: 'no account linked to email'
                    }]
                }
            }
        })
    },

    edit: (person) => {
        return db.task(async t => {
            //Check if there's a person with the provided email
            const count = await t.one('SELECT count(id) FROM person WHERE person.email = $1', [person.email]);
            if (count.count > 0) {
                return t.one(`UPDATE person SET first_name = $1, last_name = $2, username = $3
                 WHERE email = $4 RETURNING id, first_name AS firstName, last_name AS lastName, username;`,
                    [person.firstName, person.lastName, person.username, person.email]);
            } else {
                throw {
                    status: 404,
                    errors: [{
                        message: 'no account linked to email'
                    }]
                }
            }
        })
    },

    editPass: (person) => {
        return db.task(async t => {
            //Check if there's a person with the provided email
            const count = await t.one('SELECT count(id) FROM person WHERE person.email = $1', [person.email]);
            if (count.count > 0) {
                const data = await t.one(`SELECT password FROM person WHERE person.email = $1`, [person.email]);
                const match = await bcrypt.compare(person.password, data.password);
                if (match) {
                    const pass = await bcrypt.hash(person.newPassword);
                    return t.one(`UPDATE person SET password = '$1' WHERE email = '$2'`,
                       [pass, person.email]);
                } else {
                    throw {
                        status: 403,
                        errors: [{
                            message: 'incorrect password'
                        }]
                    }
                }
            } else {
                throw {
                    status: 404,
                    errors: [{
                        message: 'no account linked to email'
                    }]
                }
            }
        })
    },

    delete: (person) => {
        return db.task(async t => {
            //Check if there's a person with the provided email
            const count = await t.one('SELECT count(id) FROM person WHERE person.email = $1', [person.email]);
            if (count.count > 0) {
                return t.one(`DELETE FROM person WHERE email = $1;`,
                    [person.email]);
            } else {
                throw {
                    status: 404,
                    errors: [{
                        message: 'no account linked to email'
                    }]
                }
            }
        })
    }
};