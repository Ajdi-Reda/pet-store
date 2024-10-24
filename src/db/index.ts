import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import * as schema from "@/db/schema";

const poolConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "pet-store",
});

export const db = drizzle(poolConnection, {
  schema,
  mode: "default",
  logger: true,
});
export type DB = typeof db;
