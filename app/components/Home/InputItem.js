import React from 'react'
import Image from 'next/image'

const InputItem = ({type}) => {
  return (
    <div className='flex items-center gap-4 bg-slate-200 p-3 rounded-lg mt-3'>
        <Image src={type==='source' ? '/circle.png' : '/circle.png'} alt="source" width={15} height={15} />
        <input type='text' placeholder={type==='source' ? 'Pickup location' : 'Destination'} className='w-full bg-transparent outline-none'/>
    </div>
  )
}

export default InputItem