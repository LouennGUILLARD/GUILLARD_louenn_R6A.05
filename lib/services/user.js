'use strict';

const { Service } = require('@hapipal/schmervice');
const crypto = require('crypto');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');


module.exports = class UserService extends Service {

    create(user) {

        const { User } = this.server.models();
        user.password = this.encryptPassword(user.password);
        return User.query().insertAndFetch(user);
    }

    getTable(token) {
        const { User } = this.server.models();
        return User.query();
    }

    delete(user) {
        const { User } = this.server.models();
        return User.query().delete().where(user);
    }

    update(id,user) {
        const { User } = this.server.models();

        if (user.password) {
            user.password = this.encryptPassword(user.password);
        }

        return User.query().patchAndFetchById(id, user);
    }

    async login(user) {
        const { User } = this.server.models();
        const hashedPassword = this.encryptPassword(user.password);
        const existingUser = await User.query().findOne({ email: user.email });

        if (!(existingUser && existingUser.password === hashedPassword)) {
            throw Boom.unauthorized('Invalid email or password');
        }

        const token = Jwt.token.generate(
            {
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                //scope: user.scope
            },
            {
                key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                algorithm: 'HS512'
            },
            {
                ttlSec: 14400 // 4 hours
            }
        );
        
        return token;
    }

    encryptPassword(password) {
        return crypto.createHash('sha1').update(password).digest('hex');
    }
};
