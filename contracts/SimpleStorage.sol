pragma solidity >=0.4.21 <0.6.0;

contract SimpleStorage {
  uint public storedData = 0;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
