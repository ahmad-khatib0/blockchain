// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ERC721.sol";

contract ERC721Enumerable is ERC721 {
    uint256[] private _allTokens;
    // mapping from tokenId to position in allTokens list ;
    mapping(uint256 => uint256) private _allTokensIndex;

    // mapping of owner to list of owner token ids
    mapping(address => uint256[]) private _ownedTokens;

    // mapping from token id to index of the owner tokens list
    mapping(uint256 => uint256) private _ownedTokensIndex;

    // function tokenByIndex(uint256 _index) external view returns (uint256);

    // function tokenOfOwnerByIndex(address _owner, uint256 _index)
    //     external
    //     view
    //     returns (uint256);

    function _mint(address to, uint256 tokenId) internal override(ERC721) {
        super._mint(to, tokenId);
        _addTokensToAllTokensEnumeration(tokenId);
        _addTokensToOwnerEnumeration(to, tokenId);
    }

    function _addTokensToAllTokensEnumeration(uint256 tokenId) private {
        // this to determine the position (index) of the added token
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    function _addTokensToOwnerEnumeration(address to, uint256 tokenId) private {
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);
    }

    function tokenByIndex(uint256 index) public view returns (uint256) {
        require(index < totalSupply(), " global index out of bounds!");
        return _allTokens[index];
    }

    function tokenOfOwnerByIndex(address owner, uint256 index)
        public
        view
        returns (uint256)
    {
        require(index < balanceOf(owner), " owner index out of bounds!");
        return _ownedTokens[owner][index];
    }

    function totalSupply() public view returns (uint256) {
        return _allTokens.length;
    }
}
