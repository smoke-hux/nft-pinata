'use client'
import Image from 'next/image'
import styles from './page.module.css'
import {Contract, providers, utils} from "ethers";
import React, {useEffect, useRef, useState } from "react"
import Head from "next/head";

export default function Home() {

  // connect wallet to keep track on whether the user's wallet is connected.

  const [walletConnect, setWalletConnected] = useState(false);

  // leading is set to true when we are waiting for a transaction to get mined

  const [loading, setLoading] = useState(false);

  // tokenIdMinted keeps track of the number of tokeIds that have been minted

  const [tokenIdsMinted, setTokenIdsMinted] = useState('0');

  //create a reerence to the web3modal (used for connecting to Metamask as long as the page is open

  const web3ModalRef = useRef();

  // mint an nft : public mint

  const publicMint = async ()  => {
    try {
      console.log("Public mint");
      // we need a signer here since this is a 'write; transaction.
      const signer = await getProviderOrSigner(true);

      // create a new instance of the contract with a signer which allows
      // update methods
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer);

      // call the mint from the contract to ming the smokenft

      const tx = await nftContract.mint({
        // value signifies the cost of one smokenft which is '0.01' ethers
        // we are parsing '0.01' string to ether using the utils library from ethers.js
        value: utils.parseEther("0.01"),});

        setLoading(true);
        // wait for the transaction to get mined
        await tx.wait();
        setLoading(false);
        window.alert("You succsesfully minted a Smokenft!");

      }catch (err) {
        console.error(err);
      }
  }

  // connect wallet to metamask

  const connectWallet = async () => {
    try {
      // get the provider from web3modal , which will come from metamask in our case
      // when  used for the first time , it prompts the user to connect their wallet

      await getProviderOnSigner();
      setWalletConnected(true);
    }catch (err) {
      console.error(err);
    }
  };

  // get tokenIdsMinted : get the number of tokenIds that have been minted

  const getTokenIdsMinted = async () => {
    try{

      // get the provider from web3modal which will be metamask for this case
      // no needed for the signer here, as we are only reading from the blockchain

      const provider = await getProviderOnSigner();
      // we connect to the Contract using a Provider , so we will only have read-only access to the contract
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider);
      // call the tokenIds from the contract
      const _tokenIds = await nftContract.tokenIds();
      console.log("tokenIds", _tokenIds);
      // _tokenIds is a 'Big Number ' we need to convert the number to a string 
      setTokenIdsMinted(_tokenIds.toString());

    }catch (err) {
      console.error(err);
    }
  }

  /*
  returns a provider 
  */
  



  return (
    <main className={styles.main}>
     
    </main>
  )
}
