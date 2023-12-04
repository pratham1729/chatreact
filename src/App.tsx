// App.tsx
import  { useState, useEffect } from 'react';
import './App.css';
import ChatGPT from './chatbot/chat';
import MetaMaskConnectButton from './metamask/Metamaskwalletbutton';
import WalletInfo from './metamask/WalletInfo';
import SendTransactions from './metamask/SendTransactions';
import { formatBalance, } from './utils';
import detectEthereumProvider from '@metamask/detect-provider';

const App = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [], balance: "", chainId: "" };
  const [wallet, setWallet] = useState(initialState);

  useEffect(() => {
    const refreshAccounts = (accounts: any) => {
      if (accounts.length > 0) {
        updateWallet(accounts)
      } else {
        setWallet(initialState)
      }
    }

    const refreshChain = (chainId: any) => {               
      setWallet((wallet) => ({ ...wallet, chainId }))      
    }                                                      

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))

      if (provider) {                                           
        const accounts = await window.ethereum.request(
          { method: 'eth_accounts' }
        )
        refreshAccounts(accounts)
        window.ethereum.on('accountsChanged', refreshAccounts)
        window.ethereum.on("chainChanged", refreshChain)  
      }
    }

    getProvider()

    return () => {
      window.ethereum?.removeListener('accountsChanged', refreshAccounts)
      window.ethereum?.removeListener("chainChanged", refreshChain)  
    }
  }, [])

  const updateWallet = async (accounts:any) => {
    const balance = formatBalance(await window.ethereum!.request({   
      method: "eth_getBalance",                                      
      params: [accounts[0], "latest"],                                
    }))                                                              
    const chainId = await window.ethereum!.request({                  
      method: "eth_chainId",                                          
    })                                                                
    setWallet({ accounts, balance, chainId })                      
  }

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    updateWallet(accounts);
  };

  return (
    <div className="App">
      {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
        <MetaMaskConnectButton onConnect={handleConnect} />
      )}

      {wallet.accounts.length > 0 && hasProvider && (
        // <WalletInfo
        //   accounts={wallet.accounts}
        //   balance={wallet.balance}
        //   chainId={wallet.chainId}
        // />
       <div> Wallet Connected </div>
      )}
        <SendTransactions />
      <ChatGPT />
    </div>
  );
};

export default App;