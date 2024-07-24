import axios from 'axios';

// Define and export the fetchData function
export const fetchData = async () => {
  try {
    const response = await axios.get(
      'https://dev-api.konfhub.com/event/public/konfhub-frontend-evaluation-task'
    );

    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error for further handling if needed
  }
};