import React, { useState, useEffect } from 'react';

interface TransactionParams {
  from: string;
  to: string;
  value: string;
  gasLimit: string;
  maxPriorityFeePerGas: string;
  maxFeePerGas: string;
}

const SendTransactions: React.FC = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const handleSendEth = async () => {

    const userAccounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    setAccounts(userAccounts);

      if (accounts.length === 0) {
        await getAccount();
      }
      if (accounts.length > 0) {
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: accounts[0],
              to: '<recipient address>',
              value: '<value in wei to send>',
              gasLimit: '0x5028',
              maxPriorityFeePerGas: '0x3b9aca00',
              maxFeePerGas: '0x2540be400',
            },
          ],
        });
        console.log(txHash);
      }
  };

  const getAccount = async () => {
    try {

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Initialize your component or perform any setup here.
  }, []);

  return (
    <div>
      <button className="sendEthButton" onClick={handleSendEth}>
        Send Ethereum
      </button>
    </div>
  );
};

export default SendTransactions;
