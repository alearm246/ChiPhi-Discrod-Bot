/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("user_message_reactions", (table) => {
        table.increments("id").primary().notNullable().unique();
        table.text("user_id").notNullable().unsigned().references('id').inTable('users');
        table.text("message_id").notNullable();
        table.text("reaction_id").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("user_message_reactions");
};
