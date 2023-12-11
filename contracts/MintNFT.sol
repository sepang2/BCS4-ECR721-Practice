// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract MintNFT is ERC721Enumerable {
    string metadataURI;
    uint maxSupply;

    // Deploy시 실행되는 함수
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

    // NFT의 URI를 반환하는 함수 (프론트에 메타데이터 가져다 쓸라고 만듦)
    function tokenURI(uint _tokenId) public view override returns(string memory){
        return string(abi.encodePacked(metadataURI, '/', Strings.toString(_tokenId), '.json'));
    }
}