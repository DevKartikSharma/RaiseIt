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
        setDetails(JSON.parse(lsdata))
    }
    useEffect(() => {
        getDetails()
    }, [])
    if (status === 'loading') {
        return <div className='flex justify-center sm:items-center max-sm:pt-80 min-h-screen  text-lg baloo'>Loading . . .</div>
    }

    return (
        <Profiles details={details} />
    )
}

export default Supportees
