// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
pragma solidity ^0.8.0;

contract ERC721 {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    // event Approval(
    //     address indexed owner,
    //     address indexed approve,
    //     uint256 indexed tokenId
    // );

    mapping(uint256 => address) private _tokenOwner;
    // mapping from owner to number of owned tokens
    mapping(address => uint256) private _ownedTokensCount;
    mapping(uint256 => address) private _tokenApprovals;

    function _exists(uint256 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    function balanceOf(address _owner) public view returns (uint256) {
        require(_owner != address(0), "owner query for now-existent token");
        return _ownedTokensCount[_owner];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _tokenOwner[tokenId];
        require(owner != address(0), "owner query for now-existent token");
        return owner;
    }

    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: minting to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");
        _tokenOwner[tokenId] = to;
        //  _ownedTokensCount[to] = _ownedTokensCount[to] + 1 ; //or
        _ownedTokensCount[to] += 1;
        emit Transfer(address(0), to, tokenId);
    }

    function _transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal {
        require(
            _to != address(0),
            "Error ERC721, transfer to the zero address"
        );
        require(
            ownerOf(_tokenId) == _from,
            "Trying to transfer a token the address does not own "
        );
        _ownedTokensCount[_from] -= 1;
        _ownedTokensCount[_to] += 1;
        _tokenOwner[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }

    // function approve(address _to, uint256 tokenId) {
    //     address owner = ownerOf(tokenId);
    //     require(_to != owner, "Error- approval current owner ");
    //     require(
    //         msg.sender == owner,
    //         "current caller is not the owner of the token"
    //     );
    //     _tokenApprovals[tokenId] = _to;
    // }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public {
        _transferFrom(_from, _to, _tokenId);
    }
}
