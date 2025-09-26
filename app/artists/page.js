'use client'
import Profiles from '../components/Profiles'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const Supportees = () => {
    const { data: status } = useSession()
    const [details, setDetails] = useState([])
    const updateDetails = async () => {
        const res = await fetch(`/api/getArtists`)
        const data = await res.json()
        console.log('hi from db')
        setDetails(data.artistsdetails)
        const a = JSON.stringify(data.artistsdetails)
        localStorage.setItem("details", a)
    }
    const getDetails = async () => {
        const lsdata = localStorage.getItem("details")
        if (!lsdata) {
            await updateDetails()
            return
        }
        console.log('hi from ls');
        setDetails(JSON.parse(lsdata))
    }
    useEffect(() => {
        getDetails()
    }, [])
    if (status === 'loading') {
        return <div className='flex justify-center items-center min-h-screen text-3xl baloo'>Loading . . .</div>
    }

    return (
        <Profiles details={details} />
    )
}

export default Supportees
