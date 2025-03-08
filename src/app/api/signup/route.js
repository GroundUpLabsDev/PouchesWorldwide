import { Client } from 'pg';

const client = new Client({
  user: 'strapi_user',
  host: 'localhost',
  database: 'strapi_db',
  password: 'root',
  port: 5432,
});

client.connect();

export async function POST(req, res) {
  const {
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
    locale,
  } = req.body;

  const document_id = '123456'; // Generate this dynamically if needed

  const insertQuery = `
    INSERT INTO up_users (
      document_id, username, email, provider, password, company, website, 
      address, city, state, refer_type, refer_email, mobile_number, 
      urole, locale, confirmed, blocked, created_at, updated_at, created_by_id, updated_by_id
    )
    VALUES ($1, $2, $3, 'local', $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1)
    RETURNING *;
  `;

  try {
    const resDB = await client.query(insertQuery, [
      document_id,
      username,
      email,
      password, // Directly inserting the password (no hashing)
      company,
      website,
      address,
      city,
      state,
      refer_type,
      refer_email,
      mobile_number,
      urole,
      locale,
    ]);

    res.status(200).json({ message: 'User signed up successfully!', user: resDB.rows[0] });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ error: 'Failed to sign up user.' });
  } finally {
    client.end();
  }
}
