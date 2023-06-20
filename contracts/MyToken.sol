// SPDX-License-Identifier: LGPL-3.0

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract MyToken is ERC20 {
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol)  {
    }

    function decimals() public view override returns (uint8) {
        return 6;
    }

    function mint(uint256 _amount) external {
        require(_amount < 10 ether, "The amount cannot be greater than 10000 ether");
        _mint(msg.sender, _amount);
    }

    function burn(uint256 _amount) external {
        _burn(msg.sender, _amount);
    }
}
