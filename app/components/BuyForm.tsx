import React from "react";

type BuyFormProps = {
    buyAmount: string;
    setBuyAmount: (val: string) => void;
    selectedCrypto: string;
    setSelectedCrypto: (val: string) => void;
    cryptoList: { name: string; symbol: string; price: number | string }[];
    onSubmit: (e: React.FormEvent) => void;
};

export default function BuyForm({
    buyAmount,
    setBuyAmount,
    selectedCrypto,
    setSelectedCrypto,
    cryptoList,
    onSubmit,
}: BuyFormProps) {
    return (
        <form
            className="flex flex-col sm:flex-row items-center justify-center gap-4 border border-gray-300 rounded p-6"
            onSubmit={onSubmit}
            aria-label="Buy cryptocurrency form"
        >
            <label htmlFor="buy-amount" className="font-medium">Buy</label>
            <div className="relative w-60">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">$</span>
                <input
                    id="buy-amount"
                    type="number"
                    min="0"
                    max="5000"
                    step="0.01"
                    placeholder="0.00"
                    className="border rounded pl-7 pr-3 py-2 w-full hover: cursor-pointer"
                    value={buyAmount}
                    onChange={e => setBuyAmount(e.target.value)}
                />
            </div>
            <span className="px-3">of</span>
            <select
                className="border rounded px-3 py-2 w-60 pr-8 hover: cursor-pointer"
                value={selectedCrypto}
                onChange={e => setSelectedCrypto(e.target.value)}
            >
                {cryptoList.map((crypto) => (
                    <option key={crypto.name} value={crypto.symbol}>
                        {crypto.name} ({crypto.symbol})
                    </option>
                ))}
            </select>
            <button type="submit" className="bg-blue-600 text-white rounded px-5 py-2 hover:bg-blue-700 transition cursor-pointer">
                Buy
            </button>
        </form>
    );
}