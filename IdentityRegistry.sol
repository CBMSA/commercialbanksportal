
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityRegistry {
    struct Identity {
        string did;
        string credentialHash;
        bool verified;
    }

    mapping(address => Identity) public identities;

    function registerIdentity(string memory did, string memory credentialHash) public {
        identities[msg.sender] = Identity(did, credentialHash, false);
    }

    function verifyIdentity(address user) public {
        identities[user].verified = true;
    }

    function getIdentity(address user) public view returns (string memory, string memory, bool) {
        Identity memory id = identities[user];
        return (id.did, id.credentialHash, id.verified);
    }
}
