import abi from '../utils/SendEth.json';
import { ethers } from "ethers";
import Head from 'next/head'
import Layout from "../components/Layout"
import Image from 'next/image'
import React, { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import 'animate.css';
import './pushnotifs.js';
import * as PushAPI from "@pushprotocol/restapi";


export default function About() {
  // Contract Address & ABI
  const contractAddress = "0x898221a7eeC77A5F0102CBfa74969615e69f52cc";
  const contractABI = abi.abi;
  const ethers = require('ethers');
  const Pkey = '4c72314825ac811d6362cae345c63f013f3641b0bb45047852c8405e1e4f82d9';
  const signer = new ethers.Wallet(Pkey);

  // Component state
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [memos, setMemos] = useState([]);

  const subscribeToChannel = PushAPI.channels.subscribe({
    signer: signer,
    channelAddress: 'eip155:5:0xf536E988c04565C5309Efb02bc0ff7757e9C2512', // channel address in CAIP
    userAddress: 'eip155:5:0xf536E988c04565C5309Efb02bc0ff7757e9C2512', // user address in CAIP
    onSuccess: () => {
     console.log('opt in success');
     sendWelcomeNotification();
     dailyMessageNotification();
    },
    onError: () => {
      console.error('opt in error');
    },
    env: 'staging'
  })    

  const onNameChange = (event) => {
    setName(event.target.value);
  }

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  }

  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: 'eth_accounts' })
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const buyCoffee = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const sendEthContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("buying coffee..")
        const coffeeTxn = await sendEthContract.sendEth(
          name ? name : "anon",
          message ? message : "Enjoy your coffee!",
          { value: ethers.utils.parseEther("0.001") }
        );

        await coffeeTxn.wait();

        console.log("mined ", coffeeTxn.hash);

        console.log("coffee purchased!");

        // Clear the form fields.
        setName("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch all memos stored on-chain.
  const getMemos = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("fetching memos from the blockchain..");
        const memos = await buyMeACoffee.getMemos();
        console.log("fetched!");
        setMemos(memos);
      } else {
        console.log("Metamask is not connected");
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let buyMeACoffee;
    isWalletConnected();
    getMemos();

    // Create an event handler function for when someone sends
    // us a new memo.
    const onNewMemo = (from, timestamp, name, message) => {
      console.log("Memo received: ", from, timestamp, name, message);
      setMemos((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name
        }
      ]);
    };

    const { ethereum } = window;

    // Listen for new memo events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
      buyMeACoffee = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      buyMeACoffee.on("NewMemo", onNewMemo);
    }

    return () => {
      if (buyMeACoffee) {
        buyMeACoffee.off("NewMemo", onNewMemo);
      }
    }
  }, []);

  return (
    <div className={styles.background}>
      <Head>
        <title>Just quit my job, looking for any support for where to go next!</title>
        <meta name="description" content="Tipping site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout />

      <div className={styles.main}>
        <p className={styles.broughtToYouBy}>brought to you by proud quitters</p>
        <div className={styles.largeContainer}>
        <h1 className={styles.title}>
          quit now
        </h1>
        <h2 className={styles.powerBack}>power back to the people</h2>
        <h3 className={styles.makeMoney}>make money while quitting your job</h3>
        <h3 className={styles.paragraph}> we built this at EthSF2022 to bring power back to the people. Sunwoo and I both had hard times quitting a job, and leaned on our network heavily for support.
        For young technologists, sometimes the hardest part is admitting that something is not working. 
        We are here to empower people to be honest with themselves, as well as their employers, about what is working, and what is not.
        We envision a world where everyone is connected to the work they are doing, are happy, and are solving problems the world needs to be solved. </h3>
        <h3 className={styles.paragraph}> this was built with learning about smart contracts from Alchemy, deploying on Polygon's Mumbai Testnet, exploring zero knowledge proofs with Mina, push notifications with Push Protocol, and wallet infrastructure with Triangle. </h3>
        <h3 className={styles.paragraph}> we plan on continuing to iterate on the business model, tokenomics, and user experience of Quit Now. </h3>
        <h3 className={styles.paragraph}> so quit now. </h3>
        <h3 className={styles.paragraph}> we will support you. </h3>
        <h3 className={styles.paragraph}> your network will lift you. </h3>
        <h3 className={styles.paragraph}> your data will get you paid.  </h3>
        <h3 className={styles.paragraph}> so what are you waiting for?  </h3>
        <h3 className={styles.paragraph}> “Quitting is not giving up, it's choosing to focus your attention on something more important. Quitting is not losing confidence, it's realizing that there are more valuable ways you can spend your time. Quitting is not making excuses, it's learning to be more productive, efficient and effective instead. Quitting is letting go of things (or people) that are sucking the life out of you so you can do more things that will bring you strength.”
― Osayi Osar-Emokpae, Impossible Is Stupid </h3>
<h3 className={styles.paragraph}> quit now.</h3>
<h3 className={styles.paragraph}> join us in the mass resignation, powered by web3.</h3>







</div>
</div>

      
    </div>
  )
}
