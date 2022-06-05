'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Credentials', [
      {id: 1, login: 'med', password: '$2b$10$FPYBvGoNplfS0Vz3JcJYUOtBD65eeon0j/RVbR37CPcogQyzoxdMe', createdAt: new Date(), updatedAt: new Date()},
      {id: 2, login: 'khaledben', password: '$2b$10$UPnE3Gb/D59qsVwgvsw67eqeiyB/VstP.ixSmub9P4GxXgf//up12', createdAt: new Date(), updatedAt: new Date()}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Credentials', null, {});
  }
};
