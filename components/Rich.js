import { useState, useEffect } from 'react';

const fetchRichestAddresses = async () => {
  const url = `https://rpc.helius.xyz/?api-key=${process.env.NEXT_PUBLIC_HELIUS_KEY}`;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getLargestAccounts',
    }),
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data.result.value;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const fetchJsonFile = async () => {
  try {
    const response = await fetch('/richest_addresses.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching JSON file:', error);
    throw error;
  }
};

const RichestAddresses = () => {
  const [richestAddresses, setRichestAddresses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data has already been fetched
        if (richestAddresses.length === 0) {
          const data = await fetchRichestAddresses();
          setRichestAddresses(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fetch data from JSON file if there is an error
        const jsonFileData = await fetchJsonFile();
        setRichestAddresses(jsonFileData);
      }
    };

    fetchData();
  }, [richestAddresses]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4">Top 20 Richest Solana (SOL) Addresses</h1>
      {richestAddresses.length > 0 && (
        <table className="table text-gray-400 border-separate space-y-6 text-sm">
          <thead className="bg-gray-800 text-gray-500">
            <tr>
              <th className="p-3">Whale Address</th>
              <th className="p-3 text-left">Balance</th>
            </tr>
          </thead>
          <tbody>
            {richestAddresses.map((address) => (
              <tr key={address.address} className="bg-gray-800 rounded-xl">
                <td className="p-3">
                  <div className="flex align-items-center">
                    <div className="ml-3">{address.address}</div>
                  </div>
                </td>
                <td className="p-3">
                  <span className="bg-green-400 text-gray-50 rounded-md px-2">
                    {(address.lamports / 1e9).toLocaleString()} SOL
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    
  );
};

export default RichestAddresses;