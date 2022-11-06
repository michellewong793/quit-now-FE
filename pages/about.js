import abi from '../utils/SendEth.json';
import { ethers } from "ethers";
import Head from 'next/head'
import Layout from "../components/Layout"
import Image from 'next/image'
import React, { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import 'animate.css';
import '../components/pushnotifs.js';

export default function About() {
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
        <h3 className={styles.paragraph}> this was built with learning about smart contracts from Alchemy, deploying on Polygon Mumbai Testnet, exploring zero knowledge proofs with Mina, push notifications with Push Protocol, and wallet infrastructure with Triangle. </h3>
        <h3 className={styles.paragraph}> we plan on continuing to iterate on the business model, tokenomics, and user experience of Quit Now. </h3>
        <h3 className={styles.paragraph}> so quit now. </h3>
        <h3 className={styles.paragraph}> we will support you. </h3>
        <h3 className={styles.paragraph}> your network will lift you. </h3>
        <h3 className={styles.paragraph}> your data will get you paid.  </h3>
        <h3 className={styles.paragraph}> so what are you waiting for?  </h3>
        <h3 className={styles.paragraph}> Quitting is not giving up, it is choosing to focus your attention on something more important. Quitting is not losing confidence, it is realizing that there are more valuable ways you can spend your time. Quitting is not making excuses, it is learning to be more productive, efficient and effective instead. Quitting is letting go of things or people that are sucking the life out of you so you can do more things that will bring you strength.
― Osayi Osar-Emokpae, Impossible Is Stupid </h3>
<h3 className={styles.paragraph}> quit now.</h3>
<h3 className={styles.paragraph}> join us in the mass resignation, powered by web3.</h3>







</div>
</div>

      
    </div>
  )
}
