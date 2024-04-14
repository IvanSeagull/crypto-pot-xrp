// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0 <0.9.0;

contract Donut {
    address public iOwner;
    uint256 public donationFee;
    uint256 private feesCollected;

    struct Balances {
        uint256 balance;
        string username;
        bool isActivated;
    }

    mapping(address => Balances) public userBalances;

    struct ActivateUserResponse {
        address user;
        string username;
    }

    struct DonateResponse {
        address from;
        address to;
        uint256 amount;
        string message;
    }

    struct WithdrawResponse {
        address user;
        uint256 amount;
    }

    event ChangeDonationFee(uint256 newFee);
    event ActivateUser(ActivateUserResponse response);
    event Donate(DonateResponse response);
    event Withdraw(WithdrawResponse response);

    modifier onlyOwner() {
        require(msg.sender == iOwner, "Only owner can call this function");
        _;
    }
    modifier isUserActivated() {
        require(userBalances[msg.sender].isActivated, "User not activated");
        _;
    }

    constructor() {
        iOwner = msg.sender;
        donationFee = 5;
        userBalances[msg.sender].username = "owner";
    }

    // ============ USER STATUS ============
    function selfActivate(string memory username) public {
        require(
            !userBalances[msg.sender].isActivated,
            "User already activated"
        );
        require(bytes(username).length > 0, "Username cannot be empty");
        userBalances[msg.sender].username = username;
        userBalances[msg.sender].isActivated = true;

        emit ActivateUser(
            ActivateUserResponse({user: msg.sender, username: username})
        );
    }

    function isSelfActivated() public view returns (bool) {
        bool isActive = userBalances[msg.sender].isActivated;
        return isActive;
    }

    // ============ DONATION ============
    function donate(address toUser, string memory message) public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        uint256 fee = (msg.value * donationFee) / 100;
        uint256 amountAfterFee = msg.value - fee;
        userBalances[toUser].balance += amountAfterFee;
        feesCollected += fee;
        emit Donate(
            DonateResponse({
                from: msg.sender,
                to: toUser,
                amount: amountAfterFee,
                message: message
            })
        );
    }

    // ============ BALANCE ============
    function getBalance() public view returns (uint256) {
        return userBalances[msg.sender].balance;
    }

    function withdraw() public {
        require(userBalances[msg.sender].balance > 0, "Insufficient balance");
        uint256 amount = userBalances[msg.sender].balance;
        userBalances[msg.sender].balance = 0;
        payable(msg.sender).transfer(amount);
        emit Withdraw(WithdrawResponse({user: msg.sender, amount: amount}));
    }

    // =============== OWNER FUNCTIONS ===============
    function setDonationFee(uint256 _fee) public onlyOwner {
        require(_fee <= 100, "Fee must be between 0 and 100");
        donationFee = _fee;
        emit ChangeDonationFee(_fee);
    }
}
