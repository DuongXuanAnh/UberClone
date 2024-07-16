import React from 'react';
import Image from 'next/image';
import {UserButton} from '@clerk/nextjs';

const Header = () => {

    const headerMenu = [
        {
            id: 1,
            name: 'Ride',
            icon: 'taxiIcon.svg',
        },
        {
            id: 2,
            name: 'Package',
            icon: 'packageIcon.svg',
        }
    ]

  return (
    <div className='p-5 pb-3 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between'>
        <div className='flex gap-24 items-center'>
            <Image src="/Logo.svg" alt="logo" width={70} height={70} />
            <div className='flex gap-6 items-center'>
                {
                    headerMenu.map((item) => (
                        <div key={item.id} className='flex items-center gap-2'>
                            <Image src={`/${item.icon}`} alt={item.name} width={20} height={20} />
                            <h2 className='text-[14px] font-medium'>{item.name}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
        <UserButton />
    </div>
  )
}

export default Header