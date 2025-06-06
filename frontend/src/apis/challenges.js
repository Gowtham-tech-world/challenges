import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/api/v1/challenges';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all challenges
export const getChallenges = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching challenges:', error.response?.data || error.message);
    throw error;
  }
};

// Create a new challenge (Admin only)
export const createChallenge = async (challengeData) => {
  try {
    const response = await axios.post(API_URL, challengeData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error creating challenge:', error.response?.data || error.message);
    throw error;
  }
};

// Update a challenge (Admin only)
export const updateChallenge = async (id, challengeData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, challengeData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error('Error updating challenge:', error.response?.data || error.message);
    throw error;
  }
};

// Delete a challenge (Admin only)
export const deleteChallenge = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  } catch (error) {
    console.error('Error deleting challenge:', error.response?.data || error.message);
    throw error;
  }
};
