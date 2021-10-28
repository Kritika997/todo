
exports.up = function(knex) {
    return knex.schema
    .createTable("UserDetails",(table)=>{
        table.increments('id').primary();
        table.string("profile_picture",255).notNullable();
        table.string('UserName',255).notNullable()
        table.string('Email',255).notNullable()
        table.integer("Phone_number",255).notNullable()
        table.string('password',255).notNullable()
        table.string('Gender',255).notNullable()
        table.string('DOb',255).notNullable()
        table.string('Qualification',255).notNullable()
        table.string('Terms_and_Conditions',(255)).notNullable()
        table.unique('Email')
        table.unique('password')
    })
    .createTable('todo_list',(table)=>{
      table.increments('id').primary();
      table.string('Title',255).notNullable();
      table.string('Todo_Status',255).notNullable();
      table.string("description",255).notNullable();
      table.integer("DetailKey").references("id").inTable('UserDetails').unsigned();
  })
  
};
exports.down = function(knex) {
  return knex.schema.dropTable("UserDetails").dropTable("todo_list");
};


