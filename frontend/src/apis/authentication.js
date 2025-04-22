import axios from 'axios';

// Define the base URL of your Rails API
const API_URL = 'http://127.0.0.1:3000'; 

// Function to register a new user
export const registerUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/users`, {
      user: {
        email,
        password,
      }
    }, {
      headers: {
        'Content-Type': 'application/json', // Ensure the correct content type is set
      }
    });
    return response.data; 
  } catch (error) {
    console.error("Registration Error:", error.response || error);
    throw new Error(error.response?.data?.message || "Registration failed.");
  }
};

// Function to login a user  
export const loginUser = async ({ email, password }) => {
    try {
      const response = await axios.post(`${API_URL}/users/sign_in`, {
        user: {
          email,
          password,
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      console.log('Login Success:', response.data); // Add a console log to see the response
      return response.data;
    } catch (error) {
      console.error('Login Error:', error.response || error);
      throw new Error(error.response?.data?.message || 'Login failed.');
    }
  };

  // Funtion to logout user
  export const logoutUser = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await axios.delete(`${API_URL}/users/sign_out`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return {
        success: true,
        message: response.data.message,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Logout failed',
      };
    }
  };