// var faker = require('./faker')

// var randomItem = faker.Lorem.words()
// var randomDescription = faker.Lorem.sentences()

// exports.seed = async function (knex) {
//     await knex('items')
//       .insert([
//           { name: `${randomItem}`, description: `${randomDescription}`, price: 1000 },
//           { name: `${randomItem}`, description: `${randomDescription}`, price: 2000 },
//           { name: `${randomItem}`, description: `${randomDescription}`, price: 3000},
//           { }
//         ]);
//   };
  
exports.seed = async function (knex) {
   await knex('items').insert([
          { name: 'bowl', description: 'a bowl', price: 1000 },
          { name: 'iPhone', description: 'iPhone 8S', price: 1000 },
          {
            name: 'iPad',
            description: 'the latest iPad, works great!',
            price: 1000,
          },
        ]);
  };
  