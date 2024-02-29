import { useState } from "react";

export async function ConnectWallet() {
    const { ethereum } = window as any;
    try {
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        return { account: accounts[0], isConnected: true };
    } catch (error) {
        return { account: null, isConnected: false };
    }
}