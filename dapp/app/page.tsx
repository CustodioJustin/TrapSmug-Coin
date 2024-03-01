"use client";
import { ConnectWallet } from "./handlers/Wallet";
import Mint from "./handlers/Minting";
import Stake from "./handlers/Staking";
import Withdraw from "./handlers/Withdraw";
import Image from "next/image";
import { useEffect, useState } from "react";
import './styles/customButton.css';
import PopOutMenu from "./panels/Panel";


export default function Home() {
  const [walletKey, setWalletKey] = useState("");
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [currentStakeBalance, setStakeBalance] = useState<number>(0);
  const [currentWithBalance, setWithBalance] = useState<number>(0);
  const [showConnectBlock, setShowConnectBlock] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);

  const [menuTitle, setMenuTitle] = useState("")

  const handleOpenMenu = (buttonName: string) => {
    setMenuOpen(true);
    setMenuTitle(buttonName);
  };

  const handleCloseMenu = () => {
    RefreshBalance
    setMenuOpen(false);
  };

  const handleAcceptInput = (value: number) => {
    console.log('Accepted:', value);
  };

  const ConnectMeta = async () => {
    try {
      const account = await ConnectWallet();
      if (account) {
        const truncatedKey = account.substring(0, 7) + '*'.repeat(account.length - 30);
        setWalletKey(truncatedKey);
        setShowConnectBlock(false);
        RefreshBalance();
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // ignore error if it appears.
  const RefreshBalance = async () => {
    const balance = await Mint.getBalance();
    if (balance !== undefined) {
      setCurrentBalance(balance);
    }
    
    const stake = await Stake.getStake();
    if (stake !== undefined) {
      setStakeBalance(stake);
    }
    
    const withdrawAmount = await Withdraw.getWithdrawAmount();
    if (withdrawAmount !== undefined) {
      setWithBalance(withdrawAmount);
    }
  }

  return (
    <main className="" style={{
      background: 'linear-gradient(to bottom, #111111, #12121212)',
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    }}>
      {showConnectBlock && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-90 z-20 flex items-center justify-center">
          <button onClick={ConnectMeta} className="btn btn-three text-white" style={{ fontFamily: 'Open Sans Condensed', fontSize: '20px'}}>
            <span>Connect Meta Mask Wallet</span>
          </button>
        </div>
      )}

      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-90 z-20 flex items-center justify-center">
          <PopOutMenu
            isOpen={menuOpen}
            onClose={handleCloseMenu}
            onAccept={handleAcceptInput}
            buttonText={menuTitle}
          />
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-20 bg-black bg-opacity-50 z-10 flex items-center">
        <div className="text-white ml-2 flex-grow" style={{ fontFamily: 'Open Sans Condensed', fontSize: '16px'}}>By: Justin Chyle C. Custodio</div>
      </div>
        
        <div className="button-container">
          <img src="https://raw.githubusercontent.com/CustodioJustin/TrapSmug-Coin/main/dapp/app/images/coin.png" alt="Image" style={{ maxWidth: '100px'}} />
          <div className="text-white ml-2 flex-grow" style={{ fontFamily: 'Open Sans Condensed', fontSize: '32px', fontWeight: 'bold' }}>TrapSmug Coin</div>
          <div className="text-white" style={{ fontFamily: 'Open Sans Condensed', fontSize: '20px'}}>
            WalletID: {walletKey ? walletKey : 'Disconnected'}
          </div>
          <button onClick={() => handleOpenMenu("Mint")} className="btn btn-three text-white" style={{fontFamily: 'Open Sans Condensed', fontSize: '20px'}} >
            <span>Mint</span>
          </button>

          <button onClick={() => handleOpenMenu("Stake")} className="btn btn-three text-white" style={{fontFamily: 'Open Sans Condensed', fontSize: '20px'}}>
            <span>Stake</span>
          </button>

          <button onClick={Withdraw.withdrawCoin} className="btn btn-three text-white" style={{fontFamily: 'Open Sans Condensed', fontSize: '20px'}}>
            <span>Withdraw</span>
          </button>

          <button onClick={RefreshBalance} className="btn btn-three text-white" style={{fontFamily: 'Open Sans Condensed', fontSize: '20px'}}>
            <span>Refresh Balance</span>
          </button>

          <div className="text-white" style={{ fontFamily: 'Open Sans Condensed', fontSize: '20px'}}>
            Current TS Balance: {currentBalance}
          </div>
          <div className="text-white" style={{ fontFamily: 'Open Sans Condensed', fontSize: '20px'}}>
            Current Staked Balance: {currentStakeBalance}
          </div>
          <div className="text-white" style={{ fontFamily: 'Open Sans Condensed', fontSize: '20px'}}>
            Current Withdrawable Balance: {currentWithBalance}
          </div>
        </div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-black bg-opacity-50 z-10;">
      </div>
    </main>
  );
}
