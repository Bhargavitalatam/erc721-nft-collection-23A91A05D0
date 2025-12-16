// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTCollection is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public maxSupply;
    string public baseURI;

    constructor(string memory name_, string memory symbol_, uint256 _maxSupply, string memory _baseURI) ERC721(name_, symbol_) {
        maxSupply = _maxSupply;
        baseURI = _baseURI;
    }

    function mint(address recipient) external onlyOwner returns (uint256) {
        require(_tokenIds.current() < maxSupply, "Max supply reached");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(recipient, newTokenId);

        string memory tokenUri = string(abi.encodePacked(baseURI, Strings.toString(newTokenId), ".json"));
        _setTokenURI(newTokenId, tokenUri);

        return newTokenId;
    }

    function totalMinted() external view returns (uint256) {
        return _tokenIds.current();
    }
}
