'use client'
import React, { useState, useEffect, useRef } from 'react'
import { initiatePayment } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import Script from 'next/script'
import { toast } from 'react-toastify'

const ArtistProfile = ({ username, Details }) => {
    const [Update, setUpdate] = useState(0)
    const { data: session } = useSession()
    const details = JSON.parse(Details)
    const [AccHistory, setAccHistory] = useState([])
    useEffect(() => {
        GetAccDetails()
    }, [Update])
    const [paymentDetails, setPaymentDetails] = useState({
        name: '',
        message: ''
    })
    useEffect(() => {
        console.log(paymentDetails)
    }, [paymentDetails])
    const GetAccDetails = async () => {
        try {
            let paymentsFromls = localStorage.getItem(`${username+'payments'}`)
            if (!paymentsFromls) {
                const res = await fetch(`/api/payments?username=${username}`)
                console.log('Payments from db');
                const data = await res.json()
                localStorage.setItem(`${username+'payments'}`,JSON.stringify(data.accHistory))
                setAccHistory(data.accHistory)
                return
            }
            console.log('payments from ls');
            setAccHistory(JSON.parse(paymentsFromls))

        } catch (e) {
            console.log('Error:' + e);
        }
    }

    let Amount = 0
    for (let i = 0; i < AccHistory.length; i++) {
        Amount += AccHistory[i].amount
    }
    const handlechange = async (e) => {
        const { name, value } = e.currentTarget
        setPaymentDetails(prev => ({ ...prev, [name]: value }))
    }
    const amountRef = useRef(0)
    const handleCustomPay = async () => {
        let amount = amountRef.current.value * 100
        pay(amount)
    }
    const pay = async (amount) => {
        if (paymentDetails.name === '') {
            toast.error("Name is Mandatory")
            return
        }
        if (amount == '') {
            toast.error("Enter amount")
            return
        }
        if (paymentDetails.message == '') {
            toast.error("Message is Mandatory")
            return
        }
        const order = await initiatePayment(amount, paymentDetails, session?.user?.username, username)
        const orderId = order.id
        var options = {
            "key": process.env.NEXT_PUBLIC_RAZOR_ID,
            "amount": amount,
            "currency": "INR",
            "name": "RaiseIt",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId,
            "handler": async function (response) {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(response)
                    });

                    console.log(res)
                    const data = await res.json();

                    if (res.ok && data.success) {
                        toast.success("Payment Completed!");
                        amountRef.current.value = ''
                        setPaymentDetails({ name: '', message: '' })
                        setUpdate((prev) => prev + 1)
                        localStorage.removeItem(`${username+'payments'}`)
                    } else {
                        toast.error("❌ Payment verification failed!");
                    }
                } catch (error) {
                    console.error("Verification error:", error);
                    toast.error("❌ An error occurred during payment verification.");
                }
            },
            "prefill": {
                "name": session?.user?.name,
                "email": session?.user?.email,
                "contact": "+919876543210"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    return <>
        <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="afterInteractive"
        />
        <div className='flex flex-col min-h-screen items-center w-full mx-auto select-none'>
            <div className="frame w-full relative flex flex-col justify-center items-center">
                <img src={`${details.cover}`} alt="" className='w-full h-[40vh] object-cover z-0' />
                <div className="bg-[rgba(0,0,0,0.67)] z-10 h-[40vh] absolute top-0 w-full flex justify-center items-center ">
                    <h2 className="text-lg leading-relaxed baloo tracking-wide z-20 w-4/5 text-center rounded-lg p-3 pb-10 ">
                        {`${details.bio}`}
                    </h2>
                </div>

                <img className='w-28 h-28 rounded-full object-cover overflow-clip border-2 border-white absolute top-[30vh] z-20' src={`${details.pic}`} alt="" />

                <div className="text-center mt-13">
                    <h1 className='text-xl baloo-regular  top-[47vh] z-20'>@{`${username}`}</h1>
                    <h2 className='text-sm text-[rgb(129,129,129)] baloo'>Let's help <b>{`${details.name}`}</b> to Get a <b>Chai</b></h2>
                    <h2 className='text-sm text-[rgb(129,129,129)] baloo '>{`${AccHistory.length}`} Payments | ₹{Amount / 100} Raised</h2>
                </div>
            </div>
            <div className="payments w-[82vw] flex  gap-[2vh] baloo m-10">
                <section className='w-full overflow-y-scroll scrollbar-hide bg-[rgb(15,22,41)] h-106 rounded-lg p-7 pt-10'>
                    <h1 className='text-lg baloo-regular text-white'>
                        Top 10 Supporters.
                    </h1>
                    <div className="pl-3 mt-3 w-full h-full">
                        <ul className='*w-100 h-full space-y-2'>
                            {AccHistory.length === 0 ? <><div className='flex font-light text-xl h-full w-full'>No Funds as of Now
                            </div></> : AccHistory.map((item) => (
                                <li key={item._id} className='flex gap-1 text-white items-center '>
                                    <div className='w-[40px] h-[40px] shrink-0'><img src="/avatar.gif" alt="" width={40} /></div>
                                    <span className='baloo text-md font-extralight'>{capitalize(item.payerName)} donated <b className='font-bold'>₹ {item.amount / 100}</b> with a message "{capitalize(item.message)}"</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <section className='w-full rounded-lg bg-[rgb(15,22,41)] h-fit p-7 pt-10'>
                    <h1 className='text-lg baloo-regular text-white'>
                        Give {`${details.pronoun}` === 'she' ? 'her' : 'him'} a <b>Chai</b>
                    </h1>
                    <div className="inputs mt-3 space-y-2">
                        <input type="text" name='name' value={paymentDetails.name} onChange={handlechange} placeholder='Name' className='w-full focus:bg-[rgb(34,40,55)] autofill:bg-red-800 bg-[rgb(34,40,55)] baloo text-white p-3 rounded-lg outline-none placeholder:text-[rgb(129,129,129)]' />
                        <input type="number" ref={amountRef} placeholder='₹ Amount' className='w-full bg-[rgb(34,40,55)] baloo text-white p-3 rounded-lg outline-none placeholder:text-[rgb(129,129,129)][&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]' />
                        <textarea name="message" value={paymentDetails.message} onChange={handlechange} id="" cols="30" rows="4" placeholder='Message' className='w-full bg-[rgb(34,40,55)] baloo text-white p-3 mb-0 rounded-lg outline-none placeholder:text-[rgb(129,129,129)] h-25'></textarea>
                        <button className='w-full bg-[rgb(34,40,55)] baloo text-white p-3 mt-0 rounded-lg hover:bg-[rgb(133,133,133)] transition-all duration-200' onClick={() => { handleCustomPay() }}>Pay</button>
                        <div className="flex space-x-2">
                            <button className='flex justify-center items-center h-10 w-fit bg-[rgb(34,40,55)] baloo text-white p-3 mt-0 rounded-lg hover:bg-[rgba(133,133,133,0.25)] transition-all duration-200' onClick={() => { amountRef.current.value = 50 }}>Donate ₹ 50</button>
                            <button className=' flex justify-center items-center w-fit h-10 bg-[rgb(34,40,55)] baloo text-white p-3 mt-0 rounded-lg hover:bg-[rgba(133,133,133,0.25)] transition-all duration-200' onClick={() => { amountRef.current.value = 100 }}>Donate ₹ 100</button>
                            <button className=' flex justify-center items-center h-10 w-fit bg-[rgb(34,40,55)] baloo text-white p-3 mt-0 rounded-lg hover:bg-[rgba(133,133,133,0.25)] transition-all duration-200' onClick={() => { amountRef.current.value = 200 }}>Donate ₹ 200</button>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    </>
}

export default ArtistProfile
