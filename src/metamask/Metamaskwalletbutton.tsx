// MetaMaskConnectButton.tsx
import React from 'react';

interface MetaMaskConnectButtonProps {
  onConnect: () => Promise<void>;
}

const Metamaskwalletbutton: React.FC<MetaMaskConnectButtonProps> = ({ onConnect }) => {
  const handleConnect = async () => {
    try {
      await onConnect();
    } catch (error) {
      console.error('Error connecting MetaMask:', error);
    }
  };

  return (
    <button onClick={handleConnect}>Connect MetaMask</button>
  );
};

export default Metamaskwalletbutton;
