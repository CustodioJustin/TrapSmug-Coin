"use client";
import React, { useState, useEffect } from 'react';
import Mint from "../handlers/Minting";
import Stake from "../handlers/Staking";
import '../styles/customButton.css';

const PopOutMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAccept: (value: number) => void;
  buttonText: string;
}> = ({ isOpen, onClose, onAccept, buttonText }) => {
  const [inputValue, setInputValue] = useState('');
  const [TransactionFinish, setTransactionFinish] = useState(false);
  const [isMint, setIsMint] = useState(false);
  const [currentHash, setHash] = useState("");
  const [HiddenHash, setHiddenHash] = useState("");
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'Enter') {
        const parsedValue = parseInt(inputValue);
        if (!isNaN(parsedValue)) {
          onAccept(parsedValue);
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputValue, onClose, onAccept, buttonText]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAccept = async () => {
    const parsedValue = parseInt(inputValue);
    
    if (!isNaN(parsedValue)) {
      onAccept(parsedValue);
      switch(buttonText) {
        case 'Mint':
          const minthash = await Mint.MintCoin(parsedValue);
          if(!isNaN(minthash)) {
            setHiddenHash(minthash.substring(0, 7) + '*'.repeat(minthash.length - 30));
            setHash(minthash);
            setTransactionFinish(true);
            setIsMint(true);
          }
          break;
        case 'Stake':
          const stakehash = await Stake.stakeCoin(parsedValue);
          if(!isNaN(stakehash)) {
            setHiddenHash(stakehash.substring(0, 7) + '*'.repeat(stakehash.length - 30));
            setHash(stakehash);
            setTransactionFinish(true);
          }
      }

      //onClose();
    }
  };

  return isOpen ? (
    <div className="popout-menu">
      <div className="button-container">
        <h2 style={{ color: 'white', fontFamily: 'Open Sans Condensed', fontSize: '26px', fontWeight: 'bold'}}>Enter Amount ({buttonText})</h2>
        <input
          type="number"
          value={inputValue}
          onChange={handleChange}
          autoFocus
          style={{
            color: 'black',
            fontFamily: 'Open Sans Condensed',
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, ''); 
          }}
        />
        {TransactionFinish ? (
          <h2 style={{ color: 'white', fontFamily: 'Open Sans Condensed', fontSize: '26px', fontWeight: 'bold'}}>Transaction ID: {HiddenHash}</h2>
        ) : null }
        <button onClick={handleAccept} className="btn btn-three text-white" style={{fontFamily: 'Open Sans Condensed', fontSize: '20px'}}>Accept</button>
        <button onClick={onClose} className="btn btn-three text-white" style={{fontFamily: 'Open Sans Condensed', fontSize: '20px'}}>Close</button>
        {TransactionFinish ? (
          <a href={`https://sepolia.arbiscan.io/tx/${currentHash}`} target="_blank" rel="noopener noreferrer">
            <button className="btn btn-three text-white" style={{fontFamily: 'Open Sans Condensed', fontSize: '20px'}}> View Transaction </button>
          </a>
        ) : null}
        {TransactionFinish && isMint ? (
          <button onClick={Mint.addToken} className="btn btn-three text-white" style={{fontFamily: 'Open Sans Condensed', fontSize: '20px'}}>Import Token</button>
        ) : null}
      </div>
      <div className="overlay" onClick={onClose}></div>
    </div>
  ) : null;
};

export default PopOutMenu;
