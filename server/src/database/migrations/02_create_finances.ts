import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('finances', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.double('value').notNullable();

        table.integer('id_user')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.integer('id_type')
            .notNullable()
            .references('id')
            .inTable('types')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('finances');
}