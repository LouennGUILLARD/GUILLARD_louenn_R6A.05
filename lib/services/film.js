'use strict';

const Schmervice = require('@hapipal/schmervice');
const { transaction } = require('objection');

module.exports = class FilmService extends Schmervice.Service {

    static get name() {
        return 'filmService';
    }

    async createFilm(filmData) {
        const { Film } = this.server.models();
        return await transaction(Film.knex(), async (trx) => {
            return await Film.query(trx).insert(filmData);
        });
    }

    async updateFilm(id, filmData) {
        const { Film } = this.server.models();
        return await transaction(Film.knex(), async (trx) => {
            return await Film.query(trx).patchAndFetchById(id, filmData);
        });
    }

    async deleteFilm(id) {
        const { Film } = this.server.models();
        return await transaction(Film.knex(), async (trx) => {
            return await Film.query(trx).deleteById(id);
        });
    }
};