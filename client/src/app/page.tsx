"use client";
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false); 
  const [price, setPrice] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(0);

  useWebSocket('ws://localhost:443', {
    retryOnError: true,
    shouldReconnect: () => {
      return true;
    },
    onOpen: () => setIsConnected(true),
    onClose: () => setIsConnected(false),
    onMessage: (e) => {
      try {
        const data = JSON.parse(e.data);
        setPrice(data.ethPrice.USD);
        setGasPrice(data.gasPrice);
        setLastUpdated(0);
      } catch (e) {
        console.log(e);
      }
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(lastUpdated => lastUpdated + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className={styles.main}>
      <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap: 8}}>
        <h1>Websocket status: </h1>
        <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap: 4}}>
          <div style={{height:20, width: 20, borderRadius: 20, backgroundColor: isConnected ? '#0F0' : '#F00'}}/>
          <h1>{isConnected ? 'connected' : 'disconnected'}</h1>
        </div>
      </div>
      <h1>Last updated: {isConnected ? lastUpdated : '-'} secs ago</h1>
      <h1>Price of ether: US${isConnected && price !== 0 ? price : '-'}</h1>
      <h1>Gas Price of ethereum: {isConnected && gasPrice !==0 ? gasPrice : '-'} wei</h1>
    </main>
  )
}
