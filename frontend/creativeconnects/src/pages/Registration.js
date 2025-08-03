import React, { useState } from "react";
import CreateSelectComponent from "../components/Select";
import SwapperRegistration from "../Swapper/SwapperRegistration"; // Import SwapperRegistration
import BuyerRegistration from "../Buyer/BuyerRegistration";
import SellerRegistration from "../Seller/SellerRegistration";
import "../styles/Registration.css";
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleBack = () => {
    navigate('/');  // Redirects to the first/default page (e.g., homepage)
  };


  const handleSelect = (option) => {
    console.log("Selected Option:", option);  // Debugging: log selected option
    setSelectedOption(option);
  };

  // Function to render the selected component based on the option
  const renderSelectedComponent = () => {
    console.log("Rendering component for:", selectedOption);  // Debugging: log selected option before rendering
    switch (selectedOption) {
      case "Swapper":
        return <SwapperRegistration />;
      case "Seller":
        return <SellerRegistration />;
      case "Buyer":
        return <BuyerRegistration />;
      default:
        return null;
    }
  };


  return (
    <>
      <div className="registration-flow">
        <div
          className={`select-options-container ${selectedOption ? "fade-out" : "fade-in"
            }`}
        >
          {!selectedOption && (
            <>
              <h1 className="registrationgradient-text">SELECT YOUR DOMAIN</h1>
              <CreateSelectComponent
                logo="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
                heading="Register as Skill Swapper"
                text="Register as a skill swapper to exchange your expertise and collaborate with others for mutual benefits. Build connections and grow your skills!"
                paragraph="Our platform enables swappers to trade skills directly with others, creating valuable partnerships without monetary exchange. Swappers can easily showcase their expertise, find collaborators, and grow their abilities through mutual support and project-based exchanges. It’s a flexible, community-driven way to learn and contribute."
                buttonText="Select"
                onSelect={() => handleSelect("Swapper")
                }
              />
              <CreateSelectComponent
                logo="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
                heading="Register as Seller"
                text="Join as a seller to showcase your products or services and reach a wide audience. Start selling and grow your business today."
                paragraph="For sellers, the platform provides a powerful space to showcase products or services to a wide audience. Sellers can list offerings clearly, manage orders effortlessly, and receive secure payments, all while building trust through transparent reviews. It’s designed to help sellers grow their business smoothly and confidently."
                buttonText="Select"
                onSelect={() => handleSelect("Seller")}
              />
              <CreateSelectComponent
                logo="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
                heading="Register as Buyer"
                text="Sign up as a buyer to explore a variety of products or services and shop conveniently from trusted sellers."
                paragraph="Our platform empowers buyers to effortlessly connect with top freelancers, manage projects seamlessly, and make secure payments with confidence. With clear communication tools and trusted reviews, buyers get quality results every time."

                buttonText="Select"
                onSelect={() => handleSelect("Buyer")}
              />
              <div className="Registration-back">
                <button onClick={handleBack}>

                  Back
                </button>
              </div>
            </>
          )}
        </div>
        <div
          className={`registration-form-container ${selectedOption ? "fade-in" : "fade-out"
            }`}
        >
          {renderSelectedComponent()}
        </div>
      </div>
    </>
  );
};

export default Registration;