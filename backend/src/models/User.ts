import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/database';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: number;
  public is_organizer?: boolean;
  public refresh_token!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_organizer: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    sequelize,
    createdAt: 'created_at', 
    updatedAt: 'updated_at', 
  }
);

export default User;
