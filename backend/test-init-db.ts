import { getSandboxDB } from "./src/db/sandbox.db";

async function main() {
  try {
    console.log("Calling getSandboxDB(2, 'soal_18', 'php_level')...");
    const db = getSandboxDB(2, "soal_18", "php_level");

    console.log("Database initialized successfully!");
    
    // Check tables
    const tables = db.query("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log("Tables in database:", tables);

    // Check products count
    try {
      const products = db.query("SELECT * FROM products").all();
      console.log(`Found ${products.length} products:`);
      console.log(products);
    } catch (err: any) {
      console.error("Error querying products table:", err.message);
    }

    db.close();
  } catch (err: any) {
    console.error("Failed to run getSandboxDB:", err);
  }
}

main();
