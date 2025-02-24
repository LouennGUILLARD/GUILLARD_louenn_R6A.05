'use strict';

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable('film', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.string('description').notNullable();
            table.date('releaseDate').notNullable();
            table.string('director').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
        });
    },
    down: async (knex) => {
        await knex.schema.dropTableIfExists('film');
    }
};