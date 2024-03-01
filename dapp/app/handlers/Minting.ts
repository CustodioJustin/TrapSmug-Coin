import { initializeContract } from "./Global";
import { useEffect, useState } from "react";
    
const addToken = async () => {
  const { ethereum } = window as any;
  try {
    const isAdded = await ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: "0x336341222d362E5Fb94F54E7993b28ca5F3504fE",
          symbol: "TS",
          decimals: 18,
          image: "https://raw.githubusercontent.com/CustodioJustin/TrapSmug-Coin/main/dapp/app/images/coin.png",
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getBalance = async () => {
  const {signer, contract } = await initializeContract();
  try {
    const balance = await contract.balanceOf(signer);
    const reformattedBalance = Number(balance) / 1000000000000000000;
    return reformattedBalance;
  } catch (e: any) {
    console.log("Error data:", e.data);
    if (e.data) {
      const decodedError = contract.interface.parseError(e.data);
      console.log(`Balance retrieval failed: ${decodedError?.args}`);
    } else {
      console.log("An unknown error occurred.");
    }
  }
};

const MintCoin = async (amount: number) => {
  const {signer, contract } = await initializeContract();
  try {
    const tx = await contract.mint(signer, amount);
    await tx.wait();
    return tx.hash;
  } catch (e: any) {
    const decodedError = contract.interface.parseError(e.data);
    alert(`Minting failed: ${decodedError?.args}`);
    return null;
  }
};

const Mint = {
  addToken,
  getBalance,
  MintCoin
};

export default Mint;