// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BuyerContract {

    struct Buyer {
        string firstName;
        string lastName;
        string email;
        string phone;
        string fieldDomain;
    }

    // Mapping to store buyers by their wallet address
    mapping(address => Buyer) public buyers;
    
    // Mapping to store whether an email is registered or not
    mapping(string => bool) private registeredEmails;

    // Event to be emitted when a new buyer is registered
    event BuyerRegistered(address indexed buyerAddress, string firstName, string lastName);

    // Function to register a new buyer
    function registerBuyer(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _phone,
        string memory _fieldDomain
    ) public {
        // Ensure the provided first name, last name, and email are not empty
        require(bytes(_firstName).length > 0, "First name is required");
        require(bytes(_lastName).length > 0, "Last name is required");
        require(bytes(_email).length > 0, "Email is required");
        require(bytes(_phone).length > 0, "Phone number is required");
        require(bytes(_fieldDomain).length > 0, "Field domain is required");

        // Check if the email is already registered
        require(!registeredEmails[_email], "Email is already registered");

        // Store the buyer's information in the mapping
        buyers[msg.sender] = Buyer(_firstName, _lastName, _email, _phone, _fieldDomain);

        // Mark the email as registered
        registeredEmails[_email] = true;

        // Emit event to log the buyer registration
        emit BuyerRegistered(msg.sender, _firstName, _lastName);
    }

    // Function to retrieve buyer details by address
    function getBuyer(address _buyerAddress) public view returns (
        string memory firstName,
        string memory lastName,
        string memory email,
        string memory phone,
        string memory fieldDomain
    ) {
        Buyer memory buyer = buyers[_buyerAddress];
        return (buyer.firstName, buyer.lastName, buyer.email, buyer.phone, buyer.fieldDomain);
    }

    // Function to check if an email is already registered
    function isEmailRegistered(string memory _email) public view returns (bool) {
        return registeredEmails[_email];
    }
}
