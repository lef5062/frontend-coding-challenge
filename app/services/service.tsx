export async function fetchCrypto(limit: number = 10) {
    try {
        const response = await fetch(`/api/crypto?limit=${limit}`);
        const data = await response.json();
        const simplifiedData = data?.data?.map((crypto: any) => ({
            name: crypto.name,
            symbol: crypto.symbol,
            price: Number(crypto.quote.USD.price).toFixed(2),
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
    buyAmount: string,
    selectedCrypto: string
) {
    console.log("USD Amount: $", buyAmount, "of Crypto Symbol:", selectedCrypto)
};