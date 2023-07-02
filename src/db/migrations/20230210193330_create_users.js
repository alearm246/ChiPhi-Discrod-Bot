const { table } = require("console");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.text("id").primary().notNullable().unique();
        table.text("username").unique().notNullable();
        table.text("email").unique();
        table.integer("silver_crest").notNullable();
        table.integer("golden_crest").notNullable();
        table.timestamp("last_silver_crest");
        table.timestamp("last_golden_crest");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("users");
};
