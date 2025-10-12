'use client'
import React from 'react'
import Link from 'next/link'

const Profiles = ({ details }) => {
    return <>
        <div className='flex flex-col min-h-screen max-sm:min-h-[700px] items-center w-[80vw] mx-auto mt-15 select-none'>
            <div className="head flex items-center flex-col mt-1 gap-2">
                <h1 className='text-5xl max-sm:text-4xl baloo-semibold '>Our supportees</h1>
                <h2 className='text-xl max-sm:text-lg baloo-regular'>You can give them a <b>Chai</b></h2>
            </div>
            <div className="supportees flex flex-col flex-wrap justify-center gap-2 mt-10 w-full">
                <div className="flex justify-center flex-wrap gap-6">
                    {
                        details.map((item) => {
                            return (
                                <Link key={item._id} href={`/artists/${item.username}`} className="supportee-card cursor-default w-fit h-fit bg-[rgba(73,73,73,0.49)] rounded-2xl shadow-lg flex items-center justify-center p-2 px-10 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                                    <img
                                        src={`${item.pic}`}
                                        alt="Supportee 1"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="details flex flex-col ml-4">
                                        <h3 className="text-xl leading-5 text-white baloo-semibold">{item.name}</h3>
                                        <p className="text-left leading-5 text-[rgb(191,191,191)] baloo-light">{item.title}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>

            </div>
        </div>

    </>
}

export default Profiles
