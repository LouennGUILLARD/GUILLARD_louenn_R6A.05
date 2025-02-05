'use strict';

const Joi = require('joi')

module.exports = [{
    method: 'post',
    path: '/user',
    options: {
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
        tags: ['api']
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
        
        return await userService.login(request.payload);
    }
}
];