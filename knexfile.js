// Update with your config settings.
require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      port: process.env.PGPORT
    },
    migrations: {
      directory: __dirname + "/src/db/migrations"
    },
    seeds: {
      directory: __dirname + "/src/db/seeds/"
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      port: process.env.PGPORT
    },
    migrations: {
      tableName:  __dirname + "/src/db/migrations"
    }
  }
};
