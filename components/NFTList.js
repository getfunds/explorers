import React from "react";
import Image from 'next/image';


export default function AddressInput({ tokens, address }) {

  const tokensUrl = `/Tokens?address=${encodeURIComponent(address)}`;

  return (
    <div >
    <a className="flex items-center justify-center h-14 w-4/12 rounded-xl bg-violet-400 hover:bg-violet-200 text-white text-xs rounded px-3 py-0 transition-colors duration-300"
      href={tokensUrl}
      target="_blank"
      
    >
      <span className="font-medium text-sm text-slate-700">
        View Fungible Tokens
      </span>
    </a>
  

    <div className="h-20 max-h-full">
    </div>
      <div className="w-full bg-zinc-800">
        
        <div className="flex flex-wrap justify-center">
          {tokens.map((token, index) => {

            if (
              !token.onChainData ||
              (token.onChainData?.tokenStandard === "Fungible" ||
                token.onChainData?.tokenStandard === "FungibleAsset" || 
                token.onChainData?.tokenStandard === "" ||
                token.onChainData?.tokenStandard === undefined  )
            ) {
              return null;
            }

            return (
              <div key={index} className="w-1/2 p-4">
                 <div className="bg-white rounded-md bg-gray-800 shadow-lg">
                 
            <div className="md:flex px-4 leading-none max-w-4xl">
              <div className="flex-none">
                <Image
                  className="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 shadow-lg "
                  src={token.offChainData?.image || "/not-found.jpg"}
                  alt={token.offChainData?.name || "undefined"}
                />
              </div>
              <div className="flex-col text-gray-300 ml-4">
                <p className="font-black text-gray-800 md:text-3xl text-xlcapitalize ">
                  {token.offChainData?.name || "undefined"}
                </p>
                <div className="text-md flex justify-between px-4 my-2 text-clip overflow-hidden ... ">
                  <span className="md:text-sm text-gray-500 text-base ">
                    {token.offChainData?.description || "undefined"}
                  </span>
                  
                </div>
                <p className="hidden md:block px-4 my-4 text-sm font-serif text-left text-gray-400">
                  Mint Address: <br /> <span className="mb-0 font-semibold leading-tight text-xs"> {token.mint || "undefined"} </span> 
                </p>
                <div>
                  <a className="hidden md:block px-4 my-4 text-gray-400 text-sm font-serif text-left" target="_blank" rel="noreferrer" href={`/Collection?collectionAddress=${token.onChainData?.collection?.key}`}>
                    Collection Address: <br/> 
                    <span className="underline underline-offset-2 decoration-sky-500 mb-0 font-semibold leading-tight text-xs cursor-pointer "> {token.onChainData?.collection?.key }</span>
                    
                    <div className="my-4">
                       <a
        href={`https://magiceden.io/item-details/${token.mint}`}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto inline-flex items-center bg-neutral-400 hover:bg-neutral-200 text-white text-xs rounded px-3 py-0 transition-colors duration-300"
      >
      
      <Image className="w-5 h-5" src="/magiceden.png" alt="Magic Eden" />
      <span className="font-medium text-sm text-slate-700">Magic Eden</span>
      </a>
    </div>
                  </a>
                  
                </div>
                

              </div>
              
            </div>
           
          </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
