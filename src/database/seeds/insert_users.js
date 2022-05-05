/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: "asdgbz56", name: 'Martin L', email: 'martinl@gmail.com', hashPassword: 'lmmoikz2'},
    {id: "asg5b791", name: 'Libery', email: 'libery@gmail.com', hashPassword: 'gahz21bj'},
    {id: "znbhh2gj", name: 'Louis C', email: 'louis@gmail.com', hashPassword: 'kizkmg1h'},
  ]);
};

//npx knex seed:make insert_users       //cria um seed
//npx knex seed:run                     //executa o seed