// var faker = require('.faker')

// var randomUsername = faker.Internet.userName()
// var randomMale = faker.Name.firstNameMale().lastName()
// var randomFemale = faker.Name.firstNameFemale().lastName()
// var randomEmail = faker.Internet.email()
// var randomAddress = faker.Address.streetAddress().streetAddress().secondaryAddress().city().usState().zipCode().latitude().longitude()


// exports.seed = async function (knex) {
//     await knex('users').insert([
//         {username: `${randomUsername}`, password: 'password', gender: 'male', name: `${randomMale}`, email: `${randomEmail}`, address: `${randomAddress}`},
//         {username: `${randomUsername}`, password: 'password', gender: 'female', name: `${randomFemale}`, email: `${randomEmail}`, address: `${randomAddress}`},
//     ])
// }

exports.seed = async function (knex) {
    await knex('users').insert([
          { username: 'steve99', password: 'password' },
          { username: 'steve100', password: 'password' },
          { username: 'steve101', password: 'password' },
        ]);
  };



