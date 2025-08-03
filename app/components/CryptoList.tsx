import React from "react";

type CryptoListProps = {
    cryptoList: { name: string; symbol: string; price: number }[];
    loading: boolean
};

export default function CryptoList({ cryptoList, loading }: CryptoListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 rounded min-h-[200px]" role="list" aria-label="Cryptocurrency price list">
            {loading ? (
                <p className="text-center col-span-full flex items-center justify-center gap-2 text-xl">
                    <span className="animate-spin inline-block w-5 h-5 border-4 border-gray-800 border-t-transparent rounded-full"></span>
                    Loading...
                </p>
            ) : (
                cryptoList.map((crypto) => (
                    <div
                        key={crypto.symbol}
                        className="border border-gray-300 rounded p-4 shadow-sm w-full h-32 flex flex-col justify-center items-center text-center"
                        role="listitem"
                    >
                        <h3 className="font-semibold mb-1">
                            {crypto.name} ({crypto.symbol})
                        </h3>
                        <p>Price: ${crypto.price.toFixed(2)}</p>
                    </div>
                ))
            )}
        </div>
    );
}