const hre = require("hardhat");

async function main() {
  const RoboPunkNFTContract = await hre.ethers.getContractFactory(
    "RoboPunksNFT"
  );
  const roboPunkNFT = await RoboPunkNFTContract.deploy();
  await roboPunkNFT.deployed();

  console.log("Robofunks deployed to:", roboPunkNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
