// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SADC_CBDC {
    address public centralBank;
    mapping(address => uint256) public balances;

    event CBDCIssued(address indexed to, uint256 amount);
    event CBDCTransferred(address indexed from, address indexed to, uint256 amount);

    modifier onlyCentralBank() {
        require(msg.sender == centralBank, "Only central bank can perform this action");
        _;
    }

    constructor() {
        centralBank = msg.sender;
    }

    function issueCBDC(address bank, uint256 amount) external onlyCentralBank {
        balances[bank] += amount;
        emit CBDCIssued(bank, amount);
    }

    function transferCBDC(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit CBDCTransferred(msg.sender, to, amount);
    }
}
