// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";
// dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "postgres",
//     port: Number(process.env.DB_PORT),
//   }
// );

// export default sequelize;

import { Sequelize } from 'sequelize';
import "dotenv/config";

const sequelize = new Sequelize(



    {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: "postgres",
        port: process.env.DB_PORT,
        logging: console.log,
    }
);

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL connecté avec succès !");

        console.log("Début de la synchronisation...");

        try {
            await sequelize.sync({ alter: true });
            console.log("✅Tables synchronisées avec succès !");
        } catch (syncError) {
            console.error("❌Erreur lors de la synchronisation :", syncError);
        }

    } catch (error) {
        console.error("❌Erreur connexion DB :", error);
    }
}

export default sequelize;
export { connectDB };