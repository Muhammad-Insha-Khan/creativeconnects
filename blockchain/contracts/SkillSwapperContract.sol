// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SkillSwapperContract {

    struct SkillSwapper {
        string firstName;
        string lastName;
        string email;
        string phone;
        string password;  // You will store password securely using hashing
        string confirmPassword;
        string[] expertiseHave;
        string[] expertiseLookingFor;
    }

    // Mapping to store skill swappers by their wallet address
    mapping(address => SkillSwapper) public skillSwappers;
    
    // Mapping to store whether an email is registered or not
    mapping(string => bool) private registeredEmails;

    // Event to be emitted when a new skill swapper registers
    event SkillSwapperRegistered(address indexed swapperAddress, string firstName, string lastName);

    // Function to register a new Skill Swapper
    function registerSkillSwapper(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _phone,
        string memory _password,
        string memory _confirmPassword,
        string[] memory _expertiseHave,
        string[] memory _expertiseLookingFor
    ) public {
        // Ensure the provided fields are not empty
        require(bytes(_firstName).length > 0, "First name is required");
        require(bytes(_lastName).length > 0, "Last name is required");
        require(bytes(_email).length > 0, "Email is required");
        require(bytes(_phone).length > 0, "Phone number is required");
        require(bytes(_password).length > 0, "Password is required");
        require(bytes(_confirmPassword).length > 0, "Confirm password is required");
        require(_expertiseHave.length > 0, "Expertise you have is required");
        require(_expertiseLookingFor.length > 0, "Expertise you're looking for is required");
        
        // Ensure the passwords match
        require(keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(_confirmPassword)), "Passwords do not match");

        // Check if the email is already registered
        require(!registeredEmails[_email], "Email is already registered");

        // Store the Skill Swapper's information
        skillSwappers[msg.sender] = SkillSwapper({
            firstName: _firstName,
            lastName: _lastName,
            email: _email,
            phone: _phone,
            password: _password,  // Store password securely (hashing required in a real scenario)
            confirmPassword: _confirmPassword,  // Shouldn't store confirmPassword (remove in production)
            expertiseHave: _expertiseHave,
            expertiseLookingFor: _expertiseLookingFor
        });

        // Mark the email as registered
        registeredEmails[_email] = true;

        // Emit event for successful registration
        emit SkillSwapperRegistered(msg.sender, _firstName, _lastName);
    }

    // Function to get Skill Swapper details by address
    function getSkillSwapper(address _swapperAddress) public view returns (
        string memory firstName,
        string memory lastName,
        string memory email,
        string memory phone,
        string[] memory expertiseHave,
        string[] memory expertiseLookingFor
    ) {
        SkillSwapper memory swapper = skillSwappers[_swapperAddress];
        return (swapper.firstName, swapper.lastName, swapper.email, swapper.phone, swapper.expertiseHave, swapper.expertiseLookingFor);
    }

    // Function to check if an email is already registered
    function isEmailRegistered(string memory _email) public view returns (bool) {
        return registeredEmails[_email];
    }

    
}
/* Function to update expertise (both have and looking for)
    function updateExpertise(
        string[] memory _expertiseToAddHave,
        string[] memory _expertiseToAddLookingFor
    ) public {
        SkillSwapper storage swapper = skillSwappers[msg.sender];
        
        // Update expertise
        for (uint i = 0; i < _expertiseToAddHave.length; i++) {
            swapper.expertiseHave.push(_expertiseToAddHave[i]);
        }
        
        for (uint j = 0; j < _expertiseToAddLookingFor.length; j++) {
            swapper.expertiseLookingFor.push(_expertiseToAddLookingFor[j]);
        }
    }*/