import { faker } from "@faker-js/faker";
import { sequelize } from "../src/models/index.js";

async function seedDatabase() {
  try {
    // Sync without forcing to avoid dropping tables unintentionally
    await sequelize.sync();

    console.log("✅ Seeding database...");

    // Example: create 5 fake users if your model exists
    // Uncomment if you have a User model:
    //
    // import User from "../src/models/User.js";
    //
    // for (let i = 0; i < 5; i++) {
    //   await User.create({
    //     name: faker.person.fullName(),
    //     email: faker.internet.email(),
    //   });
    // }

    console.log("✅ Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
