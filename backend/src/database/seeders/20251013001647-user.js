'use strict';
import bcrypt from 'bcrypt';

module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('123', 10);

    await queryInterface.bulkInsert('users', [
      {
        role: 1,
        name: 'Syufi Saridih',
        email: 'syufi@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 2,
        name: 'Hafiz Jumahiddin',
        email: 'hafiz@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 3,
        name: 'Aziz Alias',
        email: 'aziz@example.com',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};