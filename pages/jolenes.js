import abi from '../utils/SendEth.json';
import { ethers } from "ethers";
import Head from 'next/head'
import Layout from "../components/Layout"
import Image from 'next/image'
import React, { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import 'animate.css';
import '../components/pushnotifs.js';
import * as PushAPI from "@pushprotocol/restapi";


export default function Jolenes() {
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
    
    <div className={styles.largeContainer}>
       


        {currentAccount ? (
          <div>
            <h1> Jolene Kiyoko Story </h1>
            <h3>I tried not to let my fear get in the way, but the news hit me like a sledge hammer. Yesterday, at 10:00am, I was laid off, apparently because of recession fears. I was told I would lose access to my work accounts within minutes; they emailed my severance package to my personal email.

Any thoughts/advice? I am an English major/editor - not a finance person. Thanks! Would also appreciate any Ethereum, words of support, or cash. 

PS. They also failed to tell me my healthcare would be cut immediately. Once COBRA kicks in, anything I need will be reimbursed, but what a shocker! 
Subscribe below for notifications on my progress.
 </h3>
            <form className={styles.form}>
              <div>
                <label>
                  Name
                </label>
                <br />

                <input
                className={styles.input}
                  id="name"
                  type="text"
                  placeholder="Miche Wong"
                  onChange={onNameChange}
                />
              </div>
              <br />
              <div>
                <label>
                  Send Jolene a supportive message
                </label>
                <br />

                <textarea
                 className={styles.input}
                  rows={3}
                  placeholder="Take care!"
                  id="message"
                  onChange={onMessageChange}
                  required
                >
                </textarea>
              </div>
              
                <button
                  type="button"
                  onClick={buyCoffee}
                  className={styles.sendEthButton}
                >
                  Gift 0.001 ETH
                </button>

                {currentAccount && (<h1>Everyone Who Loves Jolene &#128525;</h1>)}

                <div style={{"display":"flex", "flexDirection": "row", "width":"100%", "flex-wrap": "wrap"}}>
    
      {currentAccount && 
      (memos.map((memo, idx) => {
        return (
          <div key={idx} style={{"width": "10rem","backgroundColor": "black", "borderRadius": "5px", padding: "1rem", margin: "5px" }}>
            <p style={{ "fontWeight": "bold", "color": "white" }}>{memo.message}</p>
            <p  style={{ "fontWeight": "bold", "color": "white" }}>From: {memo.name} at {memo.timestamp.toString()}</p>
          </div>
        )

      }))
      }
      </div>
            </form>
          </div>
        ) : (
          <>
          <div className={styles.flexRow}>
            <div className={styles.flexColumn}> 
            <h1> Jolene Kiyoko Story </h1>
            <h3>I tried not to let my fear get in the way, but the news hit me like a sledge hammer. Yesterday, at 10:00am, I was laid off, apparently because of recession fears. I was told I would lose access to my work accounts within minutes; they emailed my severance package to my personal email.

Any thoughts/advice? I am an English major/editor - not a finance person. Thanks! Would also appreciate any Ethereum, words of support, or cash. 

PS. They also failed to tell me my healthcare would be cut immediately. Once COBRA kicks in, anything I need will be reimbursed, but what a shocker! 
Subscribe below for notifications on my progress.
 </h3>
            <p className={styles.tinyHeading}> Help Homegirl Out </p>

            <button onClick={connectWallet} className={styles.button}> Connect Wallet </button>
            <button onClick={() => subscribeToChannel} className={styles.button}> Subscribe</button>
            </div>
            
            <div className={styles.flexColumn}> 
            <p className={styles.tinyHeading}> ready to earn? </p>

            <button className={styles.button}>             
            <a href="https://tally.so/r/me5rqO">Spill the tea</a>
 </button>
            </div>
          </div>

          <div className={styles.technologiesRow}>
                      <p>Powered by <span className={styles.pinkTextColor}>Polygon</span> Mumbai, <span className={styles.pinkTextColor}>Push</span> Protocol, and <span className={styles.pinkTextColor}> Mina</span> Protocol, 
                        <p>Identity Verified by  <span className={styles.pinkTextColor}>Zero Knowledge Proofs</span> by Mina Protocol</p>
                        <p>Identity Verified by <span className={styles.pinkTextColor}>Biometric Iris Scans</span>  by World Coin</p></p>

          </div>
        </>
          )}
      </div>
      </div>


      
    </div>
  )
}
