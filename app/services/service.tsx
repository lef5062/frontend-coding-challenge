interface CryptoItem {
    name: string;
    symbol: string;
    quote: {
        USD: {
            price: number;
        };
    };
}

interface CryptoApiResponse {
    data: CryptoItem[];
}

export async function fetchCrypto(limit: number = 10) {
    try {
        const response = await fetch(`/api/crypto?limit=${limit}`);
        const data: CryptoApiResponse = await response.json();
        const simplifiedData = data?.data?.map((crypto) => ({
            name: crypto.name,
            symbol: crypto.symbol,
            price: Number(crypto.quote.USD.price),
        }));

        simplifiedData.sort((a: { name: string }, b: { name: string }) =>
            a.name.localeCompare(b.name)
        );

        return simplifiedData;
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        return [];
    }
}

export function postCrypto(
    buyAmount: number,
    selectedCrypto: string
) {
    console.log("USD Amount: $", buyAmount, "of Crypto Symbol:", selectedCrypto)
};