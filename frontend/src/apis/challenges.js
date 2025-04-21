import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/api/v1/challenges';

// Function to get all challenges
export const getChallenges = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching challenges:', error);
    throw error;
  }
};

// Function to create a new challenge
export const createChallenge = async (challengeData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(API_URL, challengeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating challenge:', error);
    throw error;
  }
};

// Function to update a challenge
export const updateChallenge = async (id, challengeData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(`${API_URL}/${id}`, challengeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating challenge:', error);
    throw error;
  }
};

// Function to delete a challenge
export const deleteChallenge = async (id) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error deleting challenge:', error);
    throw error;
  }
};
