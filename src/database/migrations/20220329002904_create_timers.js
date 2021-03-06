/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('timers', function (table){
        table.increments();
        table.string('nameTime').notNullable();
        table.integer('sampleTime').nullable();
        table.datetime('startTime').notNullable();
        table.datetime('stopTime').notNullable();
        table.double('qtdHours').notNullable();

        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('timers');
};
