"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { parseEther, formatEther } from "viem";
import { motion } from "framer-motion";
import { NFT_ADDRESS, NFT_ABI } from "@/lib/config";

export default function NFTMint(): React.ReactNode {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const { data: mintPrice } = useReadContract({ address: NFT_ADDRESS, abi: NFT_ABI, functionName: "mintPrice" });
  const { data: totalSupply } = useReadContract({ address: NFT_ADDRESS, abi: NFT_ABI, functionName: "totalSupply" });
  const { data: maxSupply } = useReadContract({ address: NFT_ADDRESS, abi: NFT_ABI, functionName: "maxSupply" });
  const { data: isMintEnabled } = useReadContract({ address: NFT_ADDRESS, abi: NFT_ABI, functionName: "isMintEnabled" });
  const { data: owner } = useReadContract({ address: NFT_ADDRESS, abi: NFT_ABI, functionName: "owner" });
  const { data: mintedCount } = useReadContract({ address: NFT_ADDRESS, abi: NFT_ABI, functionName: "mintedWallets", args: [address!], query: { enabled: !!address } });

  const isOwner = address && owner && address.toLowerCase() === (owner as string).toLowerCase();
  const progress = totalSupply && maxSupply ? (Number(totalSupply) / Number(maxSupply)) * 100 : 0;

  const handleMint = () => {
    writeContract({
      address: NFT_ADDRESS,
      abi: NFT_ABI,
      functionName: "mint",
      value: mintPrice as bigint,
    });
  };

  const handleToggleMint = () => {
    writeContract({
      address: NFT_ADDRESS,
      abi: NFT_ABI,
      functionName: "toggleMintEnabled",
    });
  };

  const handleWithdraw = () => {
    writeContract({
      address: NFT_ADDRESS,
      abi: NFT_ABI,
      functionName: "withdraw",
    });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#080810] text-white">
      {/* Header */}
      <div className="border-b border-purple-900/30 bg-black/40 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
              XFT
            </div>
            <h1 className="text-xl font-bold">MNFT <span className="text-purple-400">Collection</span></h1>
          </div>
          {isConnected ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 font-mono hidden md:block">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
              <button onClick={() => disconnect()} className="bg-red-600/20 hover:bg-red-600/40 border border-red-700/30 text-red-400 px-4 py-2 rounded-xl text-sm transition-all">
                Disconnect
              </button>
            </div>
          ) : (
            <button onClick={() => connect({ connector: injected() })} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
              Connect MetaMask
            </button>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {!isConnected ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-6xl shadow-2xl shadow-purple-500/30">
                🖼️
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                XFT
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-3">MNFT Collection</h2>
              <p className="text-purple-400 text-lg mb-2">100 Unique NFTs on Sepolia</p>
              <p className="text-gray-400">Connect your wallet to mint your MNFT</p>
            </div>
            <button onClick={() => connect({ connector: injected() })} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-purple-500/30">
              Connect MetaMask
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - NFT Preview */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-700/30 rounded-3xl p-8 flex items-center justify-center aspect-square">
                <div className="text-center">
                  <div className="text-8xl mb-4">🖼️</div>
                  <p className="text-purple-300 font-bold text-xl">MNFT #{totalSupply ? Number(totalSupply) + 1 : "?"}</p>
                  <p className="text-gray-400 text-sm mt-1">Next to be minted</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-400">Minted</span>
                  <span className="text-white font-bold">{totalSupply?.toString() || "0"} / {maxSupply?.toString() || "100"}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                  />
                </div>
                <p className="text-gray-500 text-xs mt-2">{progress.toFixed(1)}% minted</p>
              </div>
            </motion.div>

            {/* Right - Mint Panel */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              {/* Collection Info */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4">
                <h2 className="text-2xl font-bold">MNFT Collection</h2>
                <p className="text-gray-400 text-sm">A collection of 100 unique NFTs on the Ethereum Sepolia Testnet. Max 3 per wallet.</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-purple-900/20 border border-purple-800/30 rounded-xl p-3">
                    <p className="text-gray-400 text-xs mb-1">Mint Price</p>
                    <p className="text-purple-300 font-bold">{mintPrice ? formatEther(mintPrice as bigint) : "0.001"} ETH</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-3">
                    <p className="text-gray-400 text-xs mb-1">Your Mints</p>
                    <p className="text-blue-300 font-bold">{mintedCount?.toString() || "0"} / 3</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-800/30 rounded-xl p-3">
                    <p className="text-gray-400 text-xs mb-1">Status</p>
                    <p className={`font-bold text-sm ${isMintEnabled ? "text-green-400" : "text-red-400"}`}>
                      {isMintEnabled ? "Live" : "Paused"}
                    </p>
                  </div>
                  <div className="bg-pink-900/20 border border-pink-800/30 rounded-xl p-3">
                    <p className="text-gray-400 text-xs mb-1">Remaining</p>
                    <p className="text-pink-300 font-bold">
                      {maxSupply && totalSupply ? (Number(maxSupply) - Number(totalSupply)).toString() : "100"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transaction Status */}
              {(isPending || isConfirming || isSuccess) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`p-4 rounded-xl border text-sm ${isSuccess ? "bg-green-900/20 border-green-700/30 text-green-400" : "bg-yellow-900/20 border-yellow-700/30 text-yellow-400"}`}>
                  {isPending && "⏳ Waiting for MetaMask confirmation..."}
                  {isConfirming && "⏳ Transaction confirming on chain..."}
                  {isSuccess && (
                    <span>✅ Success! <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank" rel="noreferrer" className="underline ml-1">View on Etherscan</a></span>
                  )}
                </motion.div>
              )}

              {/* Mint Button */}
              <button
                onClick={handleMint}
                disabled={isPending || isConfirming || !isMintEnabled || Number(mintedCount) >= 3}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-purple-500/20"
              >
                {isPending || isConfirming ? "Processing..." :
                  !isMintEnabled ? "Minting Paused" :
                  Number(mintedCount) >= 3 ? "Max Minted (3/3)" :
                  `Mint MNFT — ${mintPrice ? formatEther(mintPrice as bigint) : "0.001"} ETH`}
              </button>

              {/* Owner Panel */}
              {isOwner && (
                <div className="bg-yellow-900/10 border border-yellow-700/20 rounded-2xl p-5 space-y-3">
                  <h3 className="text-yellow-400 font-bold text-sm">👑 Owner Panel</h3>
                  <button
                    onClick={handleToggleMint}
                    disabled={isPending || isConfirming}
                    className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${isMintEnabled ? "bg-red-600/20 hover:bg-red-600/40 border border-red-700/30 text-red-400" : "bg-green-600/20 hover:bg-green-600/40 border border-green-700/30 text-green-400"}`}
                  >
                    {isMintEnabled ? "Pause Minting" : "Enable Minting"}
                  </button>
                  <button
                    onClick={handleWithdraw}
                    disabled={isPending || isConfirming}
                    className="w-full bg-yellow-600/20 hover:bg-yellow-600/40 border border-yellow-700/30 text-yellow-400 py-3 rounded-xl font-medium text-sm transition-all"
                  >
                    Withdraw ETH
                  </button>
                </div>
              )}

              {/* Etherscan Link */}
              <div className="text-center">
                <a href={`https://sepolia.etherscan.io/address/${NFT_ADDRESS}`} target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 text-sm underline">
                  View contract on Sepolia Etherscan
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}