import { db } from "./index.js";
import { users } from "./schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  const adminEmail = "admin@email.com";
  const adminPassword = "123";

  const existingAdmin = await db.query.users.findFirst({
    where: eq(users.email, adminEmail),
  });

  if (existingAdmin) {
    console.log("Admin user already exists. Skipping.");
    return;
  }

  console.log("Admin user not found, creating one...");
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await db.insert(users).values({
    email: adminEmail,
    password: hashedPassword,
  });

  console.log("Database seeded successfully!");
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
