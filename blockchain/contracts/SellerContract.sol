// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SellerContract {

    struct Seller {
        string firstName;
        string lastName;
        string email;
        string phone;
        string fieldDomain;
        string[] skills;
    }

    // Mapping to store sellers by their wallet address
    mapping(address => Seller) public sellers;
    
    // Mapping to store whether an email is registered or not
    mapping(string => bool) private registeredEmails;

    // Event to be emitted when a new seller is registered
    event SellerRegistered(address indexed sellerAddress, string firstName, string lastName);

    // Function to register a new Seller
    function registerSeller(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _phone,
        string memory _fieldDomain,
        string[] memory _skills
    ) public {
        // Ensure the provided first name, last name, and email are not empty
        require(bytes(_firstName).length > 0, "First name is required");
        require(bytes(_lastName).length > 0, "Last name is required");
        require(bytes(_email).length > 0, "Email is required");
        require(bytes(_phone).length > 0, "Phone number is required");
        require(bytes(_fieldDomain).length > 0, "Field domain is required");
        require(_skills.length > 0, "skills is required");

        // Check if the email is already registered
        require(!registeredEmails[_email], "Email is already registered");

        // Store the Seller's information in the mapping
        sellers[msg.sender] = Seller(_firstName, _lastName, _email, _phone, _fieldDomain , _skills);

        // Mark the email as registered
        registeredEmails[_email] = true;

        // Emit event to log the Seller registration
        emit SellerRegistered(msg.sender, _firstName, _lastName);
    }

    // Function to retrieve Seller details by address
    function getSeller(address _sellerAddress) public view returns (
        string memory firstName,
        string memory lastName,
        string memory email,
        string memory phone,
        string memory fieldDomain,
        string[] memory skills
    ) {
        Seller memory seller = sellers[_sellerAddress];
        return (seller.firstName, seller.lastName, seller.email, seller.phone, seller.fieldDomain, seller.skills);
    }

    // Function to check if an email is already registered
    function isEmailRegistered(string memory _email) public view returns (bool) {
        return registeredEmails[_email];
    }
}
