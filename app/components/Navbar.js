'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import { FaAngleUp, FaAngleDown } from "react-icons/fa";


const Navbar = () => {
  const { data: session } = useSession()
  const [Dropdown, SetDropdown] = useState(true)
  const HandleDrop = () => {
    SetDropdown(!Dropdown)
  }
  const defaultProfile = 'https://imgs.search.brave.com/FWHa9QRttw1JSSHVgTxnaCCKeCisCTYKWv3idxlo3AI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3ZncmVwby5jb20v/c2hvdy8zMzU0NTUv/cHJvZmlsZS1kZWZh/dWx0LnN2Zw'

  return <>
    <div className='flex justify-between items-center px-10 h-15 baloo-medium text-2xl bg-[rgba(26,25,44,0.59)] relative select-none'>
      <Link href={'/'} className="logo">RaiseIt!</Link>
      <div className="navigation flex justify-center items-center text-xl">

        <Link href={"/signup"}><span className={`rounded-lg hover:text-[rgba(33,21,74)] hover:bg-[rgb(206,206,206)] px-4 py-1 ${(!session?.user?.image) ? '' : 'hidden'} `} >Sign Up</span></Link>
        {
          (session?.user?.image)
          && <button onClick={() => HandleDrop()} className='flex justify-center items-center space-x-2 pr-2'><img onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = 'https://imgs.search.brave.com/FWHa9QRttw1JSSHVgTxnaCCKeCisCTYKWv3idxlo3AI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3ZncmVwby5jb20v/c2hvdy8zMzU0NTUv/cHJvZmlsZS1kZWZh/dWx0LnN2Zw';
          }}
            src={session?.user?.image} className={`h-10 w-10 bg-gray-700 rounded-full overflow-hidden border-[2px] ${Dropdown ? 'border-white' : 'border-none'}`} />
            {(Dropdown) ? <FaAngleDown className='text-xs h-10' /> : <FaAngleUp className='text-xs h-10' />}</button>
        }
        {
          (!session?.user?.image)
          && <Link href={"/login"}><span className='rounded-lg hover:text-[rgba(33,21,74)] hover:bg-[rgb(206,206,206)] px-4 py-1'>Login</span></Link>
        }
        {(session?.user?.image) &&
          <div tabIndex={0} onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) { SetDropdown(true) }
          }} className={`flex flex-col items-center absolute top-[125%] right-3 px-1 h-fit w-fit baloo-light text-lg bg-[rgba(93,93,93,0.25)] rounded-lg pt-3 ${(!Dropdown) ? '' : 'hidden'} z-50`}>
            <div className="head  text-center py-1 px-4 ">Welcome {session?.user?.name}</div>
            <p className='w-[80%] border border-b-[rgba(184,184,184,0)]'></p>
            <Link href={'/dashboard'} className="head w-full hover:bg-[rgba(56,56,56,0.27)] rounded-sm mx-3 text-center py-1 px-25 text-lg">Dashboard</Link>
            <p className='w-[95%] border-b border-[#bebcbc]'></p>
            <Link href={'/artists'} className="head w-full hover:bg-[rgba(56,56,56,0.27)] rounded-sm mx-3 text-center py-1 px-25 text-lg">Donate</Link>
            <p className='w-[95%] border-b border-[#bebcbc]'></p>
            <button className="head w-full hover:bg-[rgba(56,56,56,0.27)] rounded-sm mx-3 text-center py-1 px-25 text-lg" onClick={() => signOut({ callbackUrl: '/login' })}>Logout</button>
          </div>
        }
      </div>
    </div>
  </>
}

export default Navbar
