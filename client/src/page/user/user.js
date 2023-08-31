import React, { useEffect, useState } from 'react'; // Import React and other necessary dependencies
import axios from 'axios';

const User = () => {
  const [userID, setUserID] = useState(0); 
  const [firstname, setFirstname] = useState(0); 
  const [lastname, setLastname] = useState(0);


  useEffect(() => {
    // Function to fetch the current user's session
    const fetchSession = async () => {
      try {
        const response = await axios.get('http://localhost:3001/session');
        const userId  = response.data.user_id; 
        fetchUserDetails(userId);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    // Function to fetch user details by ID
    const fetchUserDetails = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${userId}`);
        const userDetails = response.data;

        // Now, you have the user's details, you can use them in your application
        console.log('User Details:', userDetails);
        setUserID(userId); // Set the userID state
        setFirstname(userDetails.first_name)
        setLastname(userDetails.last_name)
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    // Call fetchSession when your component mounts
    fetchSession();
  }, []); // The empty array [] ensures this effect runs only once when the component mounts

  return (
    <div>
      <p>Hello welcome back {firstname} {lastname} </p>
    </div>
  );
};

export default User;
