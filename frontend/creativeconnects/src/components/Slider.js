import React, { useState, useEffect } from "react";
import "../styles/Slider.css";

const Slider = () => {
  const [isParagraph, setIsParagraph] = useState(true);

  // Mock function to return user data
  const user = () => {
    return {
      firstName: "John",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      fieldDomain: "Web Development",
      interests: "Coding, Design, Learning",
    };
  };

  const slug = "unique-slug-123"; // Example slug value

  useEffect(() => {
    const interval = setInterval(() => {
      setIsParagraph((prev) => !prev);
    }, 4000); // Toggle every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const userData = user(); // Fetch user data

  return (
    <div className="slider-container">
      <h1 className="slider-heading">
        Welcome to your Dashboard, {userData.firstName}, {userData.email}!
      </h1>
      <div className="slidercontent-container">
        {/* Text visibility controlled by isParagraph */}
        <div
          className={`content text-slide ${isParagraph ? "visible" : "hidden"}`}
        >
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phone}</p>
          <p>Field Domain: {userData.fieldDomain}</p>
          <p>Interests: {userData.interests}</p>
          <p>Your unique slug: {slug}</p>
        </div>
        {/* List visibility controlled by isParagraph */}
        <div
          className={`content list-slide ${!isParagraph ? "visible" : "hidden"}`}
        >
          <p>This is another paragraph that will alternate in and out.</p>
        </div>
      </div>
    </div>
  );
};

export default Slider;
