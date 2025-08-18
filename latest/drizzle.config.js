import "dotenv/config"; // Loads .env into process.env
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./app/configs/Schema.jsx",
  dbCredentials:{
    url:process.env.DATABASE_URL,
  }
});
