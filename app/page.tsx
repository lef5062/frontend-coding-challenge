'use client';

import { useEffect, useState } from "react";
import BuyForm from "./components/BuyForm";
import CryptoList from "./components/CryptoList";
import { fetchCrypto, postCrypto } from "./services/service";

export default function Home() {
  const [cryptoList, setCryptoList] = useState<{ name: string; symbol: string; price: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [buyAmount, setBuyAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");

  async function loadCrypto(showLoading = false) {
    if (showLoading) setLoading(true);
    const data = await fetchCrypto(10);
    setCryptoList(data);
    if (showLoading) setLoading(false);
  }

  useEffect(() => {
    const INTERVAL_SECONDS = 10;
    setSecondsLeft(INTERVAL_SECONDS);

    loadCrypto(true);

    const countdown = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          loadCrypto(false);
          return INTERVAL_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    postCrypto(buyAmount, selectedCrypto);
    setBuyAmount("");
    setSelectedCrypto("BTC");
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pt-4 px-8 pb-20 gap-8 sm:pt-8 sm:px-20">
      <main
        className="flex flex-col gap-6 row-start-2 w-full max-w-5xl"
        role="main"
        aria-label="Crypto prices dashboard main content"
      >
        <h1 className="text-3xl font-bold text-center">Crypto prices</h1>
        <p className="text-center">Next update in: {secondsLeft}s</p>
        <BuyForm
          buyAmount={buyAmount}
          setBuyAmount={setBuyAmount}
          selectedCrypto={selectedCrypto}
          setSelectedCrypto={setSelectedCrypto}
          cryptoList={cryptoList}
          onSubmit={handleSubmit}
        />
        <CryptoList cryptoList={cryptoList} loading={loading} />
      </main>
    </div>
  );
}
