import { Sequelize } from "sequelize";

let sequelize: Sequelize;

export const initializeDatabase = async (): Promise<void> => {
  try {
    sequelize = new Sequelize(process.env.DATABASE_URL || "", {
      dialect: "postgres",
      logging: false,
    });
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

export { sequelize };