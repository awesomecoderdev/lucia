// Import the better-sqlite3 module
const Database = require("better-sqlite3");
import { PrismaClient } from "@prisma/client";
export const db = new PrismaClient();

// export const db = new Database("./main.db", { verbose: console.log });

// db.exec(`CREATE TABLE IF NOT EXISTS user (
//     id TEXT NOT NULL PRIMARY KEY,
//     username TEXT NOT NULL UNIQUE,
//     password TEXT NOT NULL
// )`);

// db.exec(`CREATE TABLE IF NOT EXISTS session (
//     id TEXT NOT NULL PRIMARY KEY,
//     expires_at INTEGER NOT NULL,
//     user_id TEXT NOT NULL,
//     FOREIGN KEY (user_id) REFERENCES user(id)
// )`);

export interface DatabaseUser {
	id: string;
	username: string;
	password: string;
}
