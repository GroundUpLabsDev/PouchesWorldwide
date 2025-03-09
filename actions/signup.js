// src/actions/signup.js
"use server"; // Mark this as a Server Action

import { Client } from "pg";
import bcrypt from "bcryptjs"; // Import bcryptjs for hashing

export async function signUpUser(formData) {
  const {
    document_id,
    username,
    email,
    password, // Plain-text password
    company,
    website,
    address,
    city,
    state,
    refer_type,
    refer_email,
    mobile_number,
    urole,
  } = formData;

  // Hash the password using bcryptjs
  const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds

  const client = new Client({
    user: "strapi_user",
    host: "localhost",
    database: "strapi_db",
    password: "root",
    port: 5432,
  });

  try {
    await client.connect();
    const query = `
      INSERT INTO up_users (
        document_id, username, email, password, company, website, address,
        city, state, refer_type, refer_email, mobile_number, urole
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;
    const values = [
      document_id,
      username,
      email,
      hashedPassword, // Store the hashed password instead of plain text
      company,
      website,
      address,
      city,
      state,
      refer_type,
      refer_email,
      mobile_number,
      urole,
    ];

    await client.query(query, values);
    return { success: true, message: "Sign up successful!" };
  } catch (error) {
    console.error("Error inserting data:", error);
    return { success: false, message: "Sign up failed. Please try again." };
  } finally {
    await client.end();
  }
}
