import React, { useState } from "react";
import useGettingStartedStore from "../../hooks/store/gettingStarted.store";
import GettingStartedForm from "../../components/forms/gettingStarted/GettingStartedForm";
import { gettingStarted } from "../../api/gettingStarted.api";

const GettingStarted: React.FC = () => {
  const { getAllData, clearAllData } = useGettingStartedStore();

  // State to track the loading, error, and success states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = getAllData();
    console.log(data); // Log the data for debugging purposes

    // Assume userId is a part of the data
    const userId: string = localStorage.getItem("userId") as string;

    // Reset previous messages
    setError(null);
    setSuccessMessage(null);

    try {
      // Set loading to true while the request is in progress
      setLoading(true);

      // Call the gettingStarted API function
      const response = await gettingStarted(userId, data);
      console.log("API response:", response);

      // Set success message
      setSuccessMessage("Data successfully updated!");

      // Optionally clear the store data after API call
      clearAllData();
    } catch (error) {
      // Set error message in case of failure
      setError("There was an error while updating your data.");
      console.error("Error during API call:", error);
    } finally {
      // Set loading to false after the request is finished (success or failure)
      setLoading(false);
    }
  };

  return (
    <div>
      <GettingStartedForm onSubmit={onSubmit} />

      {/* Show a loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Show success message */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {/* Show error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GettingStarted;
