// pages/api/signup.js
import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract form data from the request body
    const {
      document_id,
      username,
      email,
      password,
      company,
      website,
      address,
      city,
      state,
      refer_type,
      refer_email,
      mobile_number,
      urole,
    } = req.body;

    // Initialize PostgreSQL client
    const client = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 5432,
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
        password,
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
      res.status(200).json({ message: 'Sign up successful!' });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Sign up failed. Please try again.' });
    } finally {
      await client.end();
    }
  } else {
    // Return a 405 error if the request method is not POST
    res.status(405).json({ message: 'Method not allowed' });
  }
}