import React, { useState } from "react";
import { ethers, BigNumber } from "ethers";
import RoboPunksNFT from "./RoboPunksNFT.json";
import { Box, Button, Flex, Input, Text, Spacer } from "@chakra-ui/react";

const RoboPunksNFTAddress = "0xFE8d38b2851840e07A97859FDd2FE34bD3a42142";

export default function MainMint({ accounts, setAccounts }) {
  const [mintAmount, SetMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);
  async function enablemint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        RoboPunksNFTAddress,
        RoboPunksNFT.abi,
        signer
      );
      try {
        const accounts = await provider.listAccounts();
        const address = accounts[0];
        const tx = await contract.setIsPublicMintEnabled(true);
        //const add = await signer.getAddress();
        const receipt = await tx.wait();

        // Check the transaction receipt to see if the transaction was successful
        if (receipt.status === 1) {
          console.log("Transaction successful");
        } else {
          console.log("Transaction failed");
        }
        //const response = contract.setIsPublicMintEnabled(true);
      } catch (err) {
        console.log(err);
      }
    }
  }
  async function handlemint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        RoboPunksNFTAddress,
        RoboPunksNFT.abi,
        signer
      );
      try {
        const tx = await contract.mint(1, {
          value: ethers.utils.parseEther("0.0"),
        });

        // Wait for the transaction to be confirmed
        const receipt = await tx.wait();

        // Check the transaction receipt to see if the transaction was successful
        if (receipt.status === 1) {
          console.log("Transaction successful");
        } else {
          console.log("Transaction failed");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    SetMintAmount(mintAmount - 1);
  };
  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    SetMintAmount(mintAmount + 1);
  };
  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div>
          <Text fontSize="48px" textShadow="0 5px #000000">
            RoboPunks
          </Text>
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000000"
          >
            RoboPunks NFT
          </Text>
          {isConnected ? (
            <div>
              <Flex align="center" justify="center">
                <Button
                  backgroundColor="#D6517D"
                  borderRadius="5px"
                  boxShadow="0px 2px 2px 1px #0F0F0F"
                  color="white"
                  cursor="pointer"
                  font
                  Family="inherit"
                  padding="15px"
                  marginTop="10px"
                  onClick={handleDecrement}
                >
                  -
                </Button>
                <Input
                  readonly
                  font
                  Family="inherit"
                  width="100px"
                  height="40px"
                  textAlign="center"
                  paddingLeft="19px"
                  marginTop="10px"
                  type="number"
                  value={mintAmount}
                />
                <Button
                  backgroundColor="#D6517D"
                  borderRadius="5px"
                  boxShadow="0px 2px 2px 1px #0F0F0F"
                  color="white"
                  cursor="pointer"
                  fontFamily="inherit"
                  padding="15px"
                  marginTop="10px"
                  onClick={handleIncrement}
                >
                  +
                </Button>
              </Flex>
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handlemint}
              >
                MintNow
              </Button>
            </div>
          ) : (
            <p>you must be connected to mint</p>
          )}
        </div>
        <Button
          backgroundColor="#D6517D"
          borderRadius="5px"
          boxShadow="0px 2px 2px 1px #0F0F0F"
          color="white"
          cursor="pointer"
          fontFamily="inherit"
          padding="15px"
          marginTop="10px"
          onClick={enablemint}
        >
          EnableMint
        </Button>
      </Box>
    </Flex>
  );
}
