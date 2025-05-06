
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConsentManager {
    mapping(address => mapping(string => bool)) public userConsent;

    event ConsentGiven(address indexed user, string dataType);
    event ConsentRevoked(address indexed user, string dataType);

    function giveConsent(string memory dataType) public {
        userConsent[msg.sender][dataType] = true;
        emit ConsentGiven(msg.sender, dataType);
    }

    function revokeConsent(string memory dataType) public {
        userConsent[msg.sender][dataType] = false;
        emit ConsentRevoked(msg.sender, dataType);
    }

    function hasConsent(address user, string memory dataType) public view returns (bool) {
        return userConsent[user][dataType];
    }
}
