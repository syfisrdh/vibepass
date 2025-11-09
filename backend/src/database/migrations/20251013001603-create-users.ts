'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      role: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      is_organizer: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      refresh_token: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.dropTable('users');
  }
};