import React, { useEffect, useState } from "react";
import { useStore } from "../zustandState";
import { getCurrentUser } from "../api/auth";

function TempHomeScreen() {
  const { currentUser, setCurrentUser } = useStore();
  const [loading, setLoading] = useState(true); // State to track loading status
  const [fetchInitiated, setFetchInitiated] = useState(false); // State to track if fetch operation has been initiated

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser(); // Fetch current user
        setCurrentUser(user); // Update current user in the store
      } catch (error) {
        console.error("Error fetching current user:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    // Check if fetch operation has been initiated and currentUser is null or username is null
    if (!fetchInitiated || !currentUser || currentUser.username === null) {
      fetchData(); // Fetch current user
      setFetchInitiated(true); // Set fetchInitiated to true once fetch operation is initiated
    }
  }, [currentUser, setCurrentUser, fetchInitiated]); // Include fetchInitiated in the dependency array

  // Render loading indicator if loading, otherwise render currentUser.username or "z"
  return <div>{loading ? "Loading..." : currentUser?.username || "z"}</div>;
}

export default TempHomeScreen;
