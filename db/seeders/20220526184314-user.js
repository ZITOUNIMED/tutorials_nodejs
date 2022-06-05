'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {id: 1, login: 'med', firstName: 'Mohamed', lastName: 'Zitouni', role: 'ADMIN', email: 'test1@gmail.com', createdAt: new Date(), updatedAt: new Date()},
      {id: 2, login: 'khaledben', firstName: 'Khaled', lastName: 'Ben Abdallah', role: 'USER', email: 'test2@gmail.com', createdAt: new Date(), updatedAt: new Date()}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
