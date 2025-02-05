'use strict';

const Joi = require('joi');
const Jwt = require('@hapi/jwt');

module.exports = [{
    method: 'post',
    path: '/user',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
            password: Joi.string().required().min(8).example('password').description('Password of the user'),
            email: Joi.string().required().email().example('test@mail.fr').description('Email of the user')
          })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.create(request.payload);
    }
},
{
    method: 'get',
    path: '/user',
    options: {
        tags: ['api'],
        // validate: {
        //     payload: Joi.object({
        //         token: Joi.string().required().example('token').description('Token of the user')
        //     })
        // }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.getTable();
    }
},
{
    method: 'delete',
    path: '/user',
    options: {
        tags: ['api'],
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user')
          })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.delete(request.payload);
    }
},
{
    method: 'post',
    path: '/user/login',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
          payload: Joi.object({
            email: Joi.string().required().email().example('test@mail.fr').description('Email of the user'),
            password: Joi.string().required().min(8).example('password').description('Password of the user')
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        const user = await userService.login(request.payload);

        if (user) {
            const token = Jwt.token.generate(
                {
                    aud: 'urn:audience:iut',
                    iss: 'urn:issuer:iut',
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    scope: user.scope // Assuming user object has a scope property
                },
                {
                    key: 'random_string',
                    algorithm: 'HS512'
                },
                {
                    ttlSec: 14400 // 4 hours
                }
            );

            return h.response({ token }).code(200);
        } else {
            return h.response({ error: 'Invalid credentials' }).code(401);
        }
    }
}
];
