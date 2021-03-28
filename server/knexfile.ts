import path from 'path';

module.exports = {
    client: 'pg',
    connection: {
        database: "moolah",
        user: "postgres",
        password: "postgres"
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
};