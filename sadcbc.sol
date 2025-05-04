// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SADCBCToken {
    // Struct to represent a trade
    struct Trade {
        address buyer;
        address seller;
        uint256 amount;
        uint256 price;
        string currency;
        bool completed;
    }

    // Events for logging trade interactions
    event TradeInitiated(
        uint256 tradeId,
        address indexed buyer,
        address indexed seller,
        uint256 amount,
        uint256 price,
        string currency
    );

    event TradeCompleted(
        to validate trade existence
    modifier tradeExists(uint256 tradeId) {
        require(trades[tradeId].buyer != address(0), "Trade does not exist");
        _;
    }

    // Modifier to validate trade completion
    modifier tradeNotCompleted(uint256 tradeId) {
        require(!trades[tradeId].completed, "Trade completed");
        _;
    }

    // Function to initiate a trade
    function initiateTrade(
        address _buyer,
        address _seller,
        uint256 _amount,
        uint256 _price,
        string memory _currency
    ) public returns (uint256) {
        require(_buyer != address(0), "Buyer address cannot be zero");
        require(_seller !=amount > 0, "Amount must be greater than zero");
        require(_price > 0, "Price must be greater than zero");
        
        tradeCounter++;

        trades[tradeCounter] = Trade({
            buyer: _buyer,
            seller: _seller,
            amount: _amount,
            price: _price,
            currency emit TradeInitiated(tradeCounter, _buyer, _seller, _amount, _price, _currency);
        return tradeCounter;
    }

    // Function to complete a trade
    function completeTrade(uint256 _tradeId) 
        public 
        tradeExists(_tradeId) 
        tradeNotCompleted(_tradeId)
    {
        Trade storage trade = trades[_tradeId trade");

        // Complete the trade
        trade.completed = true;

        emit TradeCompleted(_tradeId, trade.buyer, trade.seller, trade.amount, trade.price, trade.currency);
    }

    // Function to get trade details
    function getTrade(uint256 _tradeId)
        public
        view
        tradeExists(_tradeId)
        returns (
            address buyer,
            address seller,
            uint256 amount            string memory currency,
            bool completed
        )
    {
        Trade memory trade = trades[_tradeId];
        return (trade.buyer, trade.seller, trade.amount, trade.price, trade.currency, trade.completed);
    }
}