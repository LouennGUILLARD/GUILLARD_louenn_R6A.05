'use strict';

const { Service } = require('@hapipal/schmervice');
const crypto = require('crypto');
const Boom = require('@hapi/boom');


module.exports = class UserService extends Service {

        create(user){

            const { User } = this.server.models();
            user.password = this.encryptPassword(user.password);
            return User.query().insertAndFetch(user);
        }

        getTable() { 
            const { User } = this.server.models();

            return User.query();  
        }

        delete(user){
            const { User } = this.server.models();

            return User.query().delete().where(user);
        }

        async login(user) {
            const { User } = this.server.models();
            const hashedPassword = this.encryptPassword(user.password);
            const existingUser = await User.query().findOne({ email: user.email });

            if (existingUser && existingUser.password === hashedPassword) {
                return { login: "successful" };
            } else {
                
                throw Boom.unauthorized('Invalid email or password');
            }
        }

        encryptPassword(password) {
            return crypto.createHash('sha1').update(password).digest('hex');
        }
}