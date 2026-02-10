import React from 'react'
import logo from '@/public/DailyChronicle.svg'
import Image from 'next/image'

const AuthHeader = () => {
    return (
        <div className='flex justify-center items-center py-3 border-b border-[#E5E7EB]'>
            <Image src={logo} alt="Daily Chronicle" width={202} height={34} />
        </div>
    )
}

export default AuthHeader