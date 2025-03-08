"use client";

import { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    company: '',
    website: '',
    address: '',
    city: '',
    state: '',
    refer_type: '',
    refer_email: '', 
    mobile_number: '',
    urole: 'wholesaler', // default role
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/signup', formData);
      alert('Sign up successful!');
      setLoading(false);
    } catch (error) {
      setError('Error signing up. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-container">
      <h1>Sign Up</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="company">Company</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="website">Website</label>
          <input type="url" name="website" value={formData.website} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="state">State</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="refer_type">Referral Type</label>
          <input type="text" name="refer_type" value={formData.refer_type} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="refer_email">Referral Email</label>
          <input type="email" name="refer_email" value={formData.refer_email} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="mobile_number">Mobile Number</label>
          <input type="text" name="mobile_number" value={formData.mobile_number} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="urole">User Role</label>
          <select name="urole" value={formData.urole} onChange={handleChange}>
            <option value="wholesaler">Wholesaler</option>
            <option value="retailer">Retailer</option>
          </select>
        </div> 

        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
