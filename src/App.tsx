import './App.css'
import ChatGPT from './chat'; 

import { useState, useEffect } from 'react'
import { formatBalance, formatChainAsNum } from './utils'  
import detectEthereumProvider from '@metamask/detect-provider'

const App = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const initialState = { accounts: [], balance: "", chainId: "" }  
  const [wallet, setWallet] = useState(initialState)

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
    })
    updateWallet(accounts)
  }

  return (
    <div className="App">
      { window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&
        <button onClick={handleConnect}>Connect MetaMask</button>
      }

      { wallet.accounts.length > 0 && hasProvider &&
        <>                                                              
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div>                  
          <div>Hex ChainId: {wallet.chainId}</div>                       
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
        </>
      }
        <ChatGPT />
    </div>
  )
}

export default App