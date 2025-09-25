'use client'
import React, { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const page = () => {
    const { data: session, status } = useSession()

    const [Show, setShow] = useState(false)

    if (status === 'loading') {
        return <div className='flex justify-center items-center min-h-screen text-3xl baloo'>Loading . . .</div>
    }
    return <>
        {
            session ? <div className=' flex flex-col  items-center min-h-screen select-none'>
                <div className=" flex justify-center items-center text-3xl pt-28 baloo-semibold ">
                    <span className="pt-4 pl-8">Get your own chai tag</span>
                    <span> <img src="../tea.gif" style={{ width: 80 }} alt="" /></span>
                </div>
                <div>
                    <div className="flex flex-col gap-2 p-10 pt-5">
                        <div className="inputs flex flex-col items-center gap-4">
                            <div className="inputs w-[448px]">
                                <div className="fields">
                                    <h2>Email</h2>
                                    <input type="email" value={session?.user.email} readOnly className='border border-[rgb(55,65,81)] rounded px-4 py-2 mb-2 w-full hover:bg-[rgba(64,76,91,0.65)] bg-[rgba(36,43,53,0.65)] ' />
                                </div>
                                <div className="fields">
                                    <h2>Name</h2>
                                    <input type="name" value={session?.user.name} readOnly className='border border-[rgb(55,65,81)] rounded px-4 py-2 mb-2 w-full hover:bg-[rgba(64,76,91,0.65)] bg-[rgba(36,43,53,0.65)] ' />
                                </div>
                                <div className="fields">
                                    <h2>Username</h2>
                                    <input type="text" placeholder='Create a new username' className='username border border-[rgb(55,65,81)] rounded px-4 py-2 mb-2 w-full hover:bg-[rgba(64,76,91,0.65)] bg-[rgba(36,43,53,0.65)]' />
                                </div>
                                <div className="fields">
                                    <h2>Password</h2>
                                    <div className='flex items-center justify-between border hover:bg-[rgba(64,76,91,0.65)] border-[rgb(55,65,81)] rounded px-4 py-2 mb-2 w-full bg-[rgba(36,43,53,0.65)]'>
                                        <input placeholder='Create a new password' type={Show ? "text" : "password"} className='password w-94 outline-none' />
                                        {
                                            Show ? < AiOutlineEye onClick={() => setShow(false)} className='cursor-pointer' /> : < AiOutlineEyeInvisible onClick={() => setShow(true)} className='cursor-pointer' />
                                        }
                                    </div>
                                </div>
                            </div>
                            <input type='submit' placeholder='Continue' className='bg-[rgb(34,40,55)] text-white baloo text-xl flex items-center px-8 py-2 h-10 rounded-lg hover:bg-[rgb(44,49,64)] selection:bg-transparent w-fit' onClick={async() => {
                                const user = {
                                    email: session?.user.email,
                                    name: session?.user.name,
                                    profilePic: session?.user.image,
                                    username: document.querySelector(".username").value,
                                    password: document.querySelector(".password").value
                                }
                                const res = await fetch("/api/register",{method:"POST",body:JSON.stringify({user})})
                                if(res.ok){
                                    console.log(res.message);
                                    signOut({ callbackUrl: '/login' })
                                }
                                else{
                                    console.log(res.error);
                                }
                            }}/>
                        </div>
                    </div>
                </div>
            </div>:<div className='flex justify-center items-center min-h-screen text-3xl baloo'>page not found | 404</div>
        }
    </>
}

export default page
