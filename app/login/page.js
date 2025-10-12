'use client'
import Image from "next/image";
import React, { useEffect, useRef } from 'react'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';

const Login = () => {
    const { data: session } = useSession()
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const router = useRouter()
    useEffect(() => {
        if (session) {
            router.push('/dashboard');
        }
    }, [session, router]);
    const handleLogin = async () => {
        const prop = usernameRef.current.value
        if(!prop){
            toast.error('No username entered')
            return
        }
        const password = passwordRef.current.value
        if(!password){
            toast.error('No Password entered')
            return
        }
        const res = await signIn("credentials", {
            redirect: false,
            email: prop,
            password: password
        })
        if (res.error) {
            if (res.error === 'No user found with this email') {
                toast.error("No user found")
            }
            else if (res.error === 'Invalid password') {
                toast.error('Incorrect password')
            }
            else {
                toast.error('Something went wrong')
            }
        } else {
            toast.success('Login successfull')
            router.push('/dashboard')
        }
    }

    return <>
        <div className=' flex flex-col  items-center min-h-screen select-none'>
            <div className=" flex justify-center items-center text-3xl pt-48 baloo-semibold ">
                <span className="pt-4 pl-8">Login so you can get a chai</span>
                <span> <Image src="/tea.gif" width={80} height={80} alt="Chai" /></span>
            </div>
            <div>
                <div className="flex flex-col gap-2 p-10 pt-5">
                    <div className="inputs flex flex-col items-center gap-2">
                        <input ref={usernameRef} type="email" placeholder='Email or Username' className='border border-[rgb(55,65,81)] rounded px-4 py-2 h-10 w-72 bg-[rgba(36,43,53,0.65)] ' />
                        <input ref={passwordRef} type="password" placeholder='Password' className='border border-[rgb(55,65,81)] rounded px-4 py-2 h-10 w-72 bg-[rgba(36,43,53,0.65)] ' />
                        <button className='bg-[rgba(36,43,53,0.65)] text-white px-12 py-3 h-fit rounded-lg hover:bg-[rgb(44,49,64)] w-fit baloo text-xl' onClick={() => handleLogin()}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Login
