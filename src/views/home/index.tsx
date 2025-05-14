// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Package info
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  return (
    <div className="md:hero md:hero-content flex flex-col mx-auto p-4">
      <div className="mt-6 text-center">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-purple-500 mb-4">
          receipt.money
        </h1>
        <h2 className="text-center text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-purple-500 mb-6">
          Liquid Restaking and dual-yield protocol on Solana
        </h2>
        <div className="flex justify-center mt-4 mb-6">
          <Link href="/deposit" className="btn btn-lg bg-gradient-to-r from-green-400 to-purple-500 text-white font-bold py-4 px-16 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-all duration-300 text-xl">
            Deposit
          </Link>
        </div>
      </div>

      <div className="md:w-full text-xl md:text-2xl text-center text-slate-300 mt-4 mb-8 max-w-3xl mx-auto">
        <p className="mb-4">Solana's total value locked in DeFi stands at $9.55 billion, reflecting strong demand for yield but limited liquidity options</p>
        <p className="text-slate-400 leading-relaxed mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-purple-500 block">
            Receipt Money solves this by issuing liquid CR tokens while your assets remain locked and actively earning
          </span>
        </p>
        <div className="flex items-center space-x-4 text-lg font-semibold text-slate-200">
          <span>Deposit Your Assets</span>
          <span className="text-2xl text-green-400">→</span>
          <span>Mint $CR Tokens</span>
          <span className="text-2xl text-green-400">→</span>
          <span>Earn Multi-Protocol Yield</span>
          <span className="text-2xl text-green-400">→</span>
          <span>Redeem Anytime</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 max-w-5xl mx-auto text-center">
        <div className="p-6 bg-slate-800 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
          <h3 className="text-xl font-bold text-white mb-3">Full Liquidity, Zero Trade-Off</h3>
          <p className="text-slate-300">CR tokens remain fully liquid for swaps, collateral, or governance, unlike standard staking or lending locks.</p>
        </div>
        <div className="p-6 bg-slate-800 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
          <h3 className="text-xl font-bold text-white mb-3">Dual Yield Engine</h3>
          <p className="text-slate-300">Earn staking rewards, lending interest, AMM fees and solver routing fees.</p>
        </div>
        <div className="p-6 bg-slate-800 rounded-xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
          <h3 className="text-xl font-bold text-white mb-3">Automated Strategy</h3>
          <p className="text-slate-300">Proprietary solver continuously reallocates locked assets based on real-time data from Jupiter, Orca, Raydium and more, maximizing combined yield.</p>
        </div>
      </div>

      {wallet.publicKey && (
        <div className="flex flex-col items-center mt-6 mb-8 gap-4">
          <div className="flex flex-row justify-center mt-2">
            <div className="text-xl text-slate-300">
              {(balance || 0).toLocaleString()}
            </div>
            <div className='text-slate-500 ml-2 text-xl'>
              SOL
            </div>
          </div>
        </div>
      )}
    </div>
  );
};