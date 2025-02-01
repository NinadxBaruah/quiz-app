import axios from 'axios';

// Use the production API URL if in production, otherwise use the proxy endpoint
const apiUrl = import.meta.env.PROD 
  ? 'https://api.jsonserve.com/api'
  : '/api';

export const fetchQuizData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/Uw5CrX`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch quiz data');
  }
};
