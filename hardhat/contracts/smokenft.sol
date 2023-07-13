// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Smokenft is ERC721Enumerable, Ownable {
    using Strings for uint256;
    /**
    @dev _baseTokenURL for computing token URI
    if set, the resulting  URI for each token will be the concatenation of the 'baseURI' and the token 'tokenId'


    */

    string _baseTokenURI;

    // _price is theprice of the Smokenft NFT
    uint256 public _price = 0.01 ether;

    // _paused is used to pause the contractt in case of an emergency

    bool public _paused;

    // max number of Smokenft NFTs

    uint256 public maxTokenIds = 11;

    // total number of tokenIds in the Smokenft NFT

    uint256 public tokenIds;

    modifier onlyWhenNotPaused() {
        require(!_paused, "Contract is paused");
        _;

    }

    /**
    @dev ERC721Enumerable constructor take in a 'name' and a 'symbol' to the token collected.
    name in out case in Smokenft contract
    symbol in out case in Smokenft contract AND the symbol is SMK 

    constructor for the smokenft contract takes the baseURI to set _baseTokenURI for the collection.


    
    */

    constructor (string memory baseURI) ERC721("Smokenft", "SMK") {
        _baseTokenURI = baseURI;
    }

    // @dev mint allows an user to ming 1 NFT transaction.

    function mint() public payable onlyWhenNotPaused{
        require(tokenIds < maxTokenIds, "Exceeded maximum smokenft limit");
        require(msg.value >= _price, "Ether sent is not correct");
        tokenIds += 1;
        _safeMint(msg.sender, tokenIds);
    }

    // _baseURI overrides the openzeppelin's ERC721 implemantaion which by default
    // returned an empty string for the baseURI.

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    // tokenURI overrides the openzeppelin's ERC721 implemantaion for the tokenURI fuction
    // this function returns the URI from where we can extract the metadata for the given tokenId

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory baseURI = _baseURI();

        // here it checks if the length of the baseURI is greater than 0, if it is return the baseURI and attach 
        // the tokenId and '.jason' to it so that is knows the location of the metadata for a given file;
        // tokenid stored on IPFS 
        // If baseURI empty return an impty string

        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
    }

    // @dev setPaused makes the contract paused or unpaused

    function setPaused(bool val) public onlyOwner {
        _paused = val;
    }// 

    // @dev withdraw sends all the ether in the contract to the owner of the contract

    function withdaw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent,) = _owner.call{value:amount}("");
        require(sent, "Failed to sent the Ether to the owner");

    }


    // function to recieve Ether. msg.data must be empty

    receive() external payable {} // this can be used to recieve Ether

    // fallback function is callled when msg.data is not empty

    fallback() external payable {} // this fallback can be called when msg.data is not empty








}
