// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract MintNFT is ERC721Enumerable {
    string metadataURI;
    uint maxSupply;

    constructor(string memory _name, string memory _symbol, string memory _metadataURI, uint _maxSupply) ERC721(_name, _symbol) {
        metadataURI = _metadataURI;
        maxSupply = _maxSupply;
    }

    // NFT 민팅 함수
    function mintNFT() public {
        require(totalSupply() < maxSupply, "No more mint.");

        uint tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);
    }

    // NFT 여러개 한번에 민팅하는 함수
    function batchMint(uint _amount) public {
        for(uint i = 0; i < _amount; i++){
            mintNFT();
        }
    }

    // NFT에 URI 저장해주는 함수
    function tokenURI(uint _tokenId) public view override returns(string memory){
        return string(abi.encodePacked(metadataURI, '/', Strings.toString(_tokenId), '.json'));
    }
}