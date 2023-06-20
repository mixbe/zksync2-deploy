// SPDX-License-Identifier: LGPL-3.0

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Distributer is Ownable {
    receive() external payable {}

    /**
     *
     * distribute erc20 token
     */
    function airdropToAll(address token, uint256 amount, address[] memory users) external onlyOwner {
        uint256 userNumber = users.length;
        IERC20Metadata erc20 = IERC20Metadata(token);
        for (uint256 i = 0; i < userNumber; i++) {
            uint256 balance = erc20.balanceOf(address(this));
            if (balance > amount) {
                bool success = erc20.transfer(users[i], amount);
                require(success, "Transfer Failed");
            }
        }
    }

    function airdropToken(address token, uint256 amount, address  user) external onlyOwner {
        IERC20Metadata erc20 = IERC20Metadata(token);
        uint256 balance = erc20.balanceOf(address(this));
        if (balance > amount) {
            bool success = erc20.transfer(user, amount);
            require(success, "Transfer Failed");
        }
    }

    function airdropETH(address payable _to, uint256 _amount) external onlyOwner {
        (bool success,) = _to.call{value: _amount}("");
        require(success, "Failed to send Ether");
    }


    function airdropETHToAll(address[] memory users, uint256 _amount) external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            (bool success,) = payable(users[i]).call{value: _amount}("");
            require(success, "Failed to send Ether");
        }
    }

    function withdraw(uint256 _amount) external onlyOwner {
        (bool success,) = payable(msg.sender).call{value: _amount}("");
        require(success, "Failed to send Ether");
    }

    /**
     * get ETH Balance
     *
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
