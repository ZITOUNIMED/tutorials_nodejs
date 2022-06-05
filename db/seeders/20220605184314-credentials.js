'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Credentials', [
      {id: 1, login: 'med', password: '$2b$10$q9IDaTwkGkrtg3xQfWa8PutCQaAk4nuxy8KhOSqXF0SpzhEoQlovW', createdAt: new Date(), updatedAt: new Date()},
      {id: 2, login: 'khaledben', password: '$2b$10$fM5/mS3PDQGTUBO5P0Jn9OwgQbcz/ZsFkfXb495OQ3Z7C4td1Ru52', createdAt: new Date(), updatedAt: new Date()}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Credentials', null, {});
  }
};
