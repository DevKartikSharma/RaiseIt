// context/AppContext.js
'use client'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState, createContext, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const { data: session } = useSession()
    const [update, setUpdate] = useState(0)
    const [needDonationsfetch, setNeedDonationsfetch] = useState(false)
    const [artistsUpdate, setArtistsUpdate] = useState(1)
    return (
        <AppContext.Provider value={{ update, artistsUpdate, needDonationsfetch, setArtistsUpdate, setUpdate, setNeedDonationsfetch }}>
            {children}
        </AppContext.Provider>
    );
};
export const useAppContext = () => useContext(AppContext);
