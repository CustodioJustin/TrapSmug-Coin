"use client";
import Image from "next/image";
import { ConnectWallet } from "./handlers/Wallet";
import { useEffect, useState } from "react";


export default function Home() {

  const [walletKey, setwalletKey] = useState("");

  const Connect = async () => {
    const setwalletKey = await ConnectWallet();
  }

  return (
    <main className="">
      <button
        onClick={() => {
          Connect();
        }}
        className="p-3 bg-slate-800 text-white rounded"
      >
        {walletKey != "" ? walletKey : " Connect wallet"}
      </button>
    </main>
  );
}
