'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {id: 1, login: 'med', firstName: 'Mohamed', email: 'test1@test.com', lastName: 'Zitouni', role: 'ADMIN', createdAt: new Date(), updatedAt: new Date()},
      {id: 2, login: 'khaledben', firstName: 'Khaled', lastName: 'Ben Abdallah', email: 'test1@test.com', role: 'USER', createdAt: new Date(), updatedAt: new Date()}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
