import { FC } from 'react';
import Link from "next/link";
import dynamic from 'next/dynamic';
import React, { useState } from "react";
import { useAutoConnect } from '../contexts/AutoConnectProvider';
import Image from 'next/image';

// Use dynamic import with a proper type annotation
const WalletMultiButtonDynamic = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
) as any; // Use 'any' type to bypass TypeScript errors

export const AppBar: React.FC = () => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  return (
    <div className="navbar flex h-20 flex-row md:mb-2 shadow-lg text-neutral-content border-b border-zinc-600 bg-transparent backdrop-blur-md bg-opacity-60">
      <div className="navbar-start align-items-center">
        <div className="hidden sm:inline w-22 h-22 md:p-2 ml-10">
          <Link href="/" className="flex items-center">
            <Image src="/CRLogo.svg" alt="Receipt.money Logo" width={105} height={24} priority quality={100} />
          </Link>
        </div>
        <WalletMultiButtonDynamic className="bg-gradient-to-r from-green-400 to-purple-500 text-white font-bold btn-sm relative flex md:hidden text-lg" />
      </div>

      {/* Wallet & Settings */}
      <div className="navbar-end">
        <div className="hidden md:inline-flex align-items-center justify-items gap-6">
          {/* Navigation links */}
          <Link href="https://receipt-money.gitbook.io/receipt.money" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm rounded-btn text-lg">
            Docs
          </Link>
          <Link href="/deposit" className="btn btn-ghost btn-sm rounded-btn text-lg">
            Deposit
          </Link>
          <Link href="https://x.com/cryptorcpts" target="_blank" rel="noopener noreferrer" className="btn btn-ghost p-0 m-0 rounded-full flex items-center justify-center w-8 h-8 min-w-0 min-h-0" aria-label="X Profile">
            <Image src="/X_logo.svg" alt="X logo" width={24} height={24} className="" />
          </Link>
          <WalletMultiButtonDynamic className="bg-gradient-to-r from-green-400 to-purple-500 text-white font-bold btn-sm rounded-btn text-lg mr-6" />
        </div>
        <label
          htmlFor="my-drawer"
          className="btn-gh items-center justify-between md:hidden mr-6"
          onClick={() => setIsNavOpen(!isNavOpen)}>
          <div className="HAMBURGER-ICON space-y-2.5 ml-5">
            <div className={`h-0.5 w-8 bg-purple-600 ${isNavOpen ? 'hidden' : ''}`} />
            <div className={`h-0.5 w-8 bg-purple-600 ${isNavOpen ? 'hidden' : ''}`} />
            <div className={`h-0.5 w-8 bg-purple-600 ${isNavOpen ? 'hidden' : ''}`} />
          </div>
          <div className={`absolute block h-0.5 w-8 animate-pulse bg-purple-600 ${isNavOpen ? "" : "hidden"}`}
            style={{ transform: "rotate(45deg)" }}>
          </div>
          <div className={`absolute block h-0.5 w-8 animate-pulse bg-purple-600 ${isNavOpen ? "" : "hidden"}`}
            style={{ transform: "rotate(135deg)" }}>
          </div>
        </label>
        <div>
          <span className="absolute block h-0.5 w-12 bg-zinc-600 rotate-90 right-14"></span>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-square btn-ghost text-right mr-4">
            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box sm:w-52">
            <li>
              <div className="form-control bg-opacity-100">
                <label className="cursor-pointer label">
                  <a>Autoconnect</a>
                  <input type="checkbox" checked={autoConnect} onChange={(e) => setAutoConnect(e.target.checked)} className="toggle" />
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};