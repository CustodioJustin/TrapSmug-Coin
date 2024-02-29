import { useState } from "react";

export async function ConnectWallet() {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
}