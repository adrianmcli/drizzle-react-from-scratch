pragma solidity ^0.4.24;

contract SimpleStorage {
  uint public storedData = 0;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
