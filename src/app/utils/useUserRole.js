"use client";

import { useState, useEffect } from 'react';

const useUserRole = () => {
  const [role, setRole] = useState(null); // Default role is null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('jwt_token'); // Get JWT token from localStorage or session
        if (!token) {
          setError('User is not authenticated');
          return;
        }

        const response = await fetch('https://pouchesworldwide.com/strapi/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setRole(data.role.name); // Assuming 'role' is included in the response object
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { role, loading, error };
};

export default useUserRole;
