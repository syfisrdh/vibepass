import bcrypt from 'bcrypt';
import { QueryInterface, Sequelize } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface, sequelize: Sequelize): Promise<void> {
    const hashedPassword = await bcrypt.hash('123', 10);

    await queryInterface.bulkInsert('users', [
      {
        role: 1,
        name: 'Syufi Saridih',
        email: 'syufi@example.com',
        password: hashedPassword,
        is_organizer: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role: 2,
        name: 'Hafiz Jumahiddin',
        email: 'hafiz@example.com',
        password: hashedPassword,
        is_organizer: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role: 2,
        name: 'Aziz Alias',
        email: 'aziz@example.com',
        password: hashedPassword,
        is_organizer: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface: QueryInterface, sequelize: Sequelize): Promise<void> {
    await queryInterface.bulkDelete('users', {}, {});
  }
};
