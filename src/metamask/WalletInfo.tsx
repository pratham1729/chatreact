import React from 'react';
import { formatChainAsNum } from '../utils/index';

interface WalletInfoProps {
  accounts: string[];
  balance: string;
  chainId: string;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ accounts, balance, chainId }) => {
  return (
    <>
      <div>Wallet Accounts: {accounts[0]}</div>
      <div>Wallet Balance: {balance}</div>
      <div>Hex ChainId: {chainId}</div>
      <div>Numeric ChainId: {formatChainAsNum(chainId)}</div>
    </>
  );
};

export default WalletInfo;
