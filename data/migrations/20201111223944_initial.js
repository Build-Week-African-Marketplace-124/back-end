exports.up = async function (knex) {
    await knex.schema.createTable('users', users => {
            users.increments('id');
    
            users.string('username', 255).notNullable().unique();
            users.string('password', 255).notNullable();
            users.string('location', 255);
            users.string('image', 255);
          })
    
    await knex.schema.createTable('items', items => {
            items.increments('id');
            items.string('name', 255).notNullable();
            items.string('description', 255);
            items.integer('price').notNullable();
          })
    }
    
    exports.down = async function (knex) {
      await knex.schema.dropTableIfExists('users')
      await knex.schema.dropTableIfExists('items')
    };