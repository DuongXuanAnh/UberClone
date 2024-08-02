import React from 'react'
import InputItem from './InputItem'

const SearchSection = () => {
  return (
    <>
    <div className='p-2 md:p-6 border-[2px] rounded-xl'>
        <p className='text-[20px] font-bold'>Get a ride</p>
        <InputItem type='source' />
        <InputItem type='destination' />
        <button className='w-full bg-black text-white p-3 mt-3 rounded-xl'>Search</button>
    </div>

    </>
  )
}

export default SearchSection