'use client'
import React, { useEffect, useState } from 'react'
import { useSession, signOut } from "next-auth/react"
import { useAppContext } from '../context/AppContext'

const Dashboard = () => {
    const { data: session, status, update } = useSession()
    const [updatedSession, setupdatedSession] = useState(null)
    const { needDonationsfetch, setNeedDonationsfetch } = useAppContext()

    useEffect(() => {
        if (needDonationsfetch) {
            const updateDonations = async () => {
                const updated = await update()
                setupdatedSession(updated)
                console.log('updated');

                setNeedDonationsfetch(false)
            }
            updateDonations()
        }
    }, [needDonationsfetch])
    if (status === 'loading') {
        return <div className='flex justify-center items-center min-h-screen text-3xl baloo'>Loading . . .</div>
    }
    return <>
        <div className='baloo min-h-screen w-full flex flex-col items-center  grow-0 pt-20 select-none'>
            <h1 className='text-2xl baloo font-bold mb-4'>Welcome, {session?.user?.name || ''}</h1>
            <div className="inputs w-[448px]">
                <div className="fields">
                    <h2>Email</h2>
                    <input type="email" value={session?.user?.email || ''} readOnly className='border border-[rgb(55,65,81)] rounded px-4 py-2 mb-2 w-full bg-[rgba(36,43,53,0.65)] ' />
                </div>
                <div className="fields">
                    <h2>Name</h2>
                    <input type="name" value={session?.user?.name || ''} readOnly className='border border-[rgb(55,65,81)] select-none rounded px-4 py-2 mb-2 w-full bg-[rgba(36,43,53,0.65)] ' />
                </div>
                <div className="fields">
                    <h2>Username</h2>
                    <input type="text" value={session?.user?.username || ''} readOnly className='border border-[rgb(55,65,81)] rounded px-4 py-2 mb-2 w-full bg-[rgba(36,43,53,0.65)] ' />
                </div>
                <div className="fields">
                    <h2>Total donations</h2>
                    <input type="text" value={'₹ ' + `${updatedSession?.amount ?? session?.user?.donations ?? 0}` || ''} readOnly className='border border-[rgb(55,65,81)] rounded px-4 py-2 mb-2 w-full bg-[rgba(36,43,53,0.65)] ' />
                </div>
            </div>
            <div className="fields mt-4 w-[448px]">
                <button onClick={() => signOut({ callbackUrl: '/login' })} className='bg-[rgb(220,38,38)] text-white px-4 py-2 text-xl rounded hover:bg-[rgb(185,28,28)] w-full'>Logout</button>
            </div>
        </div>
    </>
}

export default Dashboard
