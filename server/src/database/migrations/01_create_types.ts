import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('types', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.boolean('is_income').notNullable();

        table.integer('id_user')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('types');
}