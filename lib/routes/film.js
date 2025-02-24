'use strict';

const Joi = require('joi');

module.exports = [
{
  method: 'POST',
  path: '/films',
  options: {
    tags: ['api'],
    auth: {
      scope: ['admin']
    },
    validate: {
        payload: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            dateSortie: Joi.date().required(),
            realisateur: Joi.string().required()
        })
    }
  },
  handler: async (request, h) => {
      const film = await filmService.createFilm(request.payload);
      return h.response(film).code(201);
  }
},
{
  method: 'PUT',
  path: '/films/{id}',
  options: {
    tags: ['api'],
    auth: {
      scope: ['admin']
    },
    validate: {
        params: Joi.object({
            id: Joi.number().integer().required()
        }),
        payload: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            dateSortie: Joi.date().required(),
            realisateur: Joi.string().required()
        })
    }
  },
  handler: async (request, h) => {
      const film = await filmService.updateFilm(request.params.id, request.payload);
      return h.response(film).code(200);
  }
},
{
  method: 'DELETE',
  path: '/films/{id}',
  options: {
    tags: ['api'],
    auth: {
      scope: ['admin']
    },
    validate: {
        params: Joi.object({
            id: Joi.number().integer().required()
        })
      }
  },
  handler: async (request, h) => {
      await filmService.deleteFilm(request.params.id);
      return h.response().code(204);
  }
}
];