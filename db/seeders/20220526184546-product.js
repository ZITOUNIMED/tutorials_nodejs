'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {id: 1, title: 'Product 1', price: 35, amount: 665, userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 2, title: 'Product 2', price: 666, amount: 57, userId: 1, createdAt: new Date(), updatedAt: new Date()},
      {id: 3, title: 'Product 3', price: 8766, amount: 665, userId: 1, createdAt: new Date(), updatedAt: new Date()},

      {id: 4, title: 'Product 4', price: 4565, amount: 6666, userId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 5, title: 'Product 5', price: 444, amount: 8888, userId: 2, createdAt: new Date(), updatedAt: new Date()},
      {id: 6, title: 'Product 6', price: 900, amount: 7755, userId: 2 ,createdAt: new Date(), updatedAt: new Date()},
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
