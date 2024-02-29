import { useState } from "react";

export const [walletKey, setwalletKey] = useState("");
export async function ConnectWallet() {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);
}