// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunksNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerwallet;
    bool public isPublicMintEnable;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint) public walletMints;

    constructor() payable ERC721("RoboPunks", "RP") {
        mintPrice = 0.0 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerwallet = 3;
    }

    function setIsPublicMintEnabled(bool isEnabled) external onlyOwner {
        isPublicMintEnable = isEnabled;
    }

    function setBasedTokenUri(
        string calldata _baseTokenUri
    ) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function tokenURI(
        uint256 tokenid
    ) public view override returns (string memory) {
        require(_exists(tokenid), "Token does not exist");
        return
            string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(tokenid),
                    ".json"
                )
            );
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            ""
        );
        require(success, "withdraw failed");
    }

    function mint(uint256 quantity) public payable {
        require(isPublicMintEnable, "minting not available");
        require(msg.value == quantity * mintPrice, "wrong value");
        require(totalSupply * quantity <= maxSupply, "no supply left");
        require(
            walletMints[msg.sender] + quantity <= maxPerwallet,
            "exceeded max wallet"
        );

        for (uint256 i = 0; i < quantity; i++) {
            uint256 newTokenId = totalSupply;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}
