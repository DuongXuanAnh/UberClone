"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const InputItem = ({type}) => {

    const [value, setValue] = useState(null);
    const [placeholder, setPlaceholder] = useState(type==='source' ? 'Pickup location' : 'Destination');

  return (
    <div className='flex items-center gap-4 bg-slate-200 p-3 rounded-lg mt-3'>
        <Image src={type==='source' ? '/circle.png' : '/circle.png'} alt="source" width={15} height={15} />
        {/* <input type='text' placeholder={type==='source' ? 'Pickup location' : 'Destination'} className='w-full bg-transparent outline-none'/> */}
        <GooglePlacesAutocomplete 
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            selectProps={{
                value,
                onChange: setValue,
                placeholder: placeholder,
                isClearable: true,
                className: 'w-full',
                components:{
                    DropdownIndicator: false
                },
                styles:{
                    control: (provided) => ({
                        ...provided,
                        backgroundColor: '#00ffff00',
                        border: 'none',
                      })
                }
              }}
        />
      
    </div>
  )
}

export default InputItem