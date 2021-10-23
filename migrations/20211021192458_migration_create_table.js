
exports.up = function(knex) {
    return knex.schema
    .createTable("usersignup",(table)=>{
        table.increments('id').primary();
        table.string('UserName',255).notNullable()
        table.string('Email',255).notNullable()
        table.string('password',255).notNullable()
        table.string('Gender',255).notNullable()
        table.string('DOb',255).notNullable()
        table.string('Qualification',255).notNullable()
        table.string('Terms_and_Conditions',(255)).notNullable()
        table.unique('Email')
        table.unique('password')
    })
  
};
exports.down = function(knex) {
  return knex.schema.dropTable("")
};
