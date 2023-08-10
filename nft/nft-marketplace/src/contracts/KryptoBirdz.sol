// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ERC721Connector.sol";

contract KryptoBird is ERC721Connector {
    //array to store our nfts
    string[] public kryptoBirdz;
    mapping(string => bool) _krptoBirdzExists;

    function mint(string memory _kryptoBird) public {
        require(
            !_krptoBirdzExists[_kryptoBird],
            "Error: kryptoBird already exist"
        );

        //  deprecated:  uint256 _id = kryptoBirdz.push(_kryptoBird);
        //push no longer returns the length, but a ref to the added element
        kryptoBirdz.push(_kryptoBird);
        uint256 _id = kryptoBirdz.length - 1;
        _mint(msg.sender, _id);

        _krptoBirdzExists[_kryptoBird] = true;
    }

    constructor() ERC721Connector("KryptoBird", "KBIRDZ") {}
}
