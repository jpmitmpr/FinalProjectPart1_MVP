import { sequelize } from "../src/models/index.js";

async function setupDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log("✅ Database synced successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  }
}

setupDatabase();
