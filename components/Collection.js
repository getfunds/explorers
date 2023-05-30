import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Collection = () => {
  const url = `https://api.helius.xyz/v0/token-metadata?api-key=${process.env.NEXT_PUBLIC_HELIUS_KEY}`;
  const router = useRouter();
  const [collectionAddress, setCollectionAddress] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [salesData, setSalesData] = useState(null);

  const fetchData = async (address) => {
    try {
      const { data } = await axios.post(url, {
        mintAccounts: [address],
        includeOffChain: true,
        disableCache: false,
      });
      console.log('metadata:', data);
      setResponseData(data);
    } catch (error) {
      console.log('Error fetching data:', error);
      setResponseData(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(collectionAddress);
  };

  useEffect(() => {
    const { collectionAddress } = router.query;
    if (collectionAddress) {
      setCollectionAddress(collectionAddress);
      fetchData(collectionAddress);
    }
  }, [router.query]);

  const handleChange = (event) => {
    setCollectionAddress(event.target.value);
  };

  const getSales = async () => {
    const salesAPI =
    `https://api.helius.xyz/v1/nft-events?api-key=${process.env.NEXT_PUBLIC_HELIUS_KEY}`;

    try {
      const { data } = await axios.post(salesAPI, {
        query: {
          sources: ['MAGIC_EDEN'],
          types: ['NFT_SALE'],
          nftCollectionFilters: {
            verifiedCollectionAddress: [collectionAddress],
          },
        },
      });

      console.log(' sales:', data.result);
      setSalesData(data.result);
    } catch (error) {
      console.log('Error:', error);
      setSalesData([]);
    }
  };

  useEffect(() => {
    getSales();
  }, [collectionAddress]);

  return (
    <div className="flex w-full h-full flex-col justify-center items-center xl:p-16 p-4 pt-8 space-y-24">
      <form className="flex w-full items-center justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          value={collectionAddress}
          placeholder="Enter collection address"
          onChange={handleChange}
          className="flex px-4 py-2 rounded-l-lg w-full xl:w-[28.3rem] outline-0 bg-zinc-800 text-white"
        />
        <button className="flex p-2 rounded-r-lg bg-zinc-800 font-bold text-white duration-200 cursor-pointer" type="submit">
          <svg className="flex w-6 p-1 rounded-lg hover:bg-zinc-700 duration-200" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFFFFF" d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"></path>
          </svg>
        </button>
      </form>

     
      

      {responseData && (
        <div className="flex flex-col justify-center">
          <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
            <div className="w-full md:w-1/2 bg-white grid place-items-center">
              <img src={responseData[0].offChainMetadata.metadata.image} alt="Collection" className="rounded-xl" />
            </div>
            <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
              <div className="flex justify-between item-center">
                <div className="flex items-center"></div>
                <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                  {responseData[0].account}
                </div>
                <div className="">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="font-black text-gray-800 md:text-3xl text-xl">{responseData[0].onChainMetadata.metadata.data.name}</h3>
              <p className="md:text-lg text-gray-500 text-base">{responseData[0].offChainMetadata.metadata.description}</p>
              <p className="text-xl font-black text-gray-500">
                Update Authority:
                <span className="font-normal text-gray-600 text-base"> {responseData[0].onChainMetadata.metadata.updateAuthority}</span>
                <div className="my-4">
                       <a
        href={`https://magiceden.io/marketplace/${responseData[0].account}`}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto inline-flex items-center bg-neutral-400 hover:bg-neutral-200 text-white text-xs rounded px-3 py-0 transition-colors duration-300"
      >
      
      <img className="w-5 h-5" src="/magiceden.png" alt="Magic Eden" />
      <span className="font-medium text-sm text-slate-700">Magic Eden</span>
      </a>
    </div>
              </p>

            </div>
          </div>
          
        <div>
          
         {salesData && (

 <div className=" my-8 relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="p-6 pb-0 mb-0 bg-white rounded-t-2xl">
        <h6>Recent Sales Activity</h6>
      </div>
      <div className="flex-auto px-0 pt-0 pb-2">
        <div className="p-0 overflow-x-auto">
          <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
            <thead className="align-bottom">
              <tr className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                <th >Signature TX</th>
                <th >Seller</th>
                <th ></th>
                <th >Buyer</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale, index) => (
                <tr key={index}>
                  <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <div className="flex px-2 py-1">
                      <div className="flex flex-col justify-center underline underline-offset-2 decoration-sky-500  "> 
                      <a target="_blank" rel="noreferrer" href={`https://xray.helius.xyz/tx/${sale.signature}`} >
                        <h6 className="mb-0 leading-normal text-sm"  >{sale.signature}</h6>
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <p className="mb-0 font-semibold leading-tight text-xs">{sale.seller}</p>
                  </td>
                  <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
                    <span className="bg-gradient-to-tl from-green-600 to-lime-400 px-3.6 text-xs rounded-1.8 py-2.2 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">=&gt; </span>
                  </td>
                  <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                    <span className="mb-0 font-semibold leading-tight text-xs">{sale.buyer}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
)}
        </div>
        
        </div>
        
        
      )}
    </div>
  );
};

export default Collection;
