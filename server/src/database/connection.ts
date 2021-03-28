import knex from 'knex';

const db = knex({
    client: 'pg',
    connection: {
        database: "moolah",
        user: "postgres",
        password: "postgres"
    },
    useNullAsDefault: true,
});

export default db;