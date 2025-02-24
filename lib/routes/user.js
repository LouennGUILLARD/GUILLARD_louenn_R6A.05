'use strict';

const Joi = require('joi');

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
            email: Joi.string().required().email().example('test@mail.fr').description('Email of the user'),
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
        auth: false,
        tags: ['api'],
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        return await userService.getTable(request.payload);
    }
},
{
    method: 'put',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        auth: false,
        //scope: ['admin'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().example(1).description('Id of the user to update')
            }),
            payload: Joi.object({
                firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().min(8).example('password').description('Password of the user'),
                email: Joi.string().email().example('test@mail.fr').description('Email of the user')
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        return await userService.update(request.params,request.payload);
    }
},
{
    method: 'delete',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        auth: false,
        //scope: ['admin'],
        validate: {
          params : Joi.object({
            id: Joi.number().integer().required().example(1).description('Id of the user to delete')
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
        return await userService.login(request.payload);
    }
}
];
