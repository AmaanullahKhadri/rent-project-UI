
// Define the type for the API response (adjust this to your backend API response structure)
export interface LoginResponse {
    token: string;  // assuming a token is returned on successful login
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
  
  // API endpoint URL (replace with your actual endpoint)
  const API_URL = 'http://localhost:5247/api/Users/login';
  
  // Function to handle login API request
  export const postLoginData = async (data: { email: string; password: string }) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw new Error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };