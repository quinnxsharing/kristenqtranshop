import React, { useEffect, useState } from 'react';

const CheckoutComponent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2>Checkout Page</h2>
      <p>Current Time: {currentTime.toLocaleTimeString()}</p>
      <h2> Thank for shopping with Kristen's Shop </h2>
    </div>
  );
};

export default CheckoutComponent;
