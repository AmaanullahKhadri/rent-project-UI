import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook
import { postLoginData } from "./Login-api"; // Import the login function from login-api.ts
import "./Login.css"; // Import CSS for styling

const Login = () => {
  const [email, setEmail] = useState<string>(""); // State for email
  const [password, setPassword] = useState<string>(""); // State for password
  const [error, setError] = useState<string>(""); // State for error message
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state for API request
  const navigate = useNavigate(); // Hook to navigate to different pages

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form behavior

    // Validate form input
    if (!email || !password) {
      setError("Both fields are required!"); // Show error if fields are empty
      return;
    }

    setIsLoading(true); // Set loading state to true while the API call is in progress
    setError(""); // Clear previous error messages

    const requestData = { email, password }; // Prepare data for API request

    try {
      // Call loginUser API function
      const response = await postLoginData(requestData);

      if (!response) {
        setError("Invalid credentials, please try again."); // Handle invalid credentials
        return;
      }

      // If login is successful, navigate to the dashboard
      navigate("/dashboard");
    } catch (error) {
      // Handle unexpected errors
      setError("An error occurred during login. Please try again later.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false); // Reset the loading state once the request is completed
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>

        {/* Display error message */}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
            required
          />

          {/* Button with dynamic text based on loading state */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
