"use client";
import React, { useState, useContext } from 'react'
import Image from 'next/image'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

const InputItem = ({type}) => {

    const [value, setValue] = useState(null);
    const [placeholder, setPlaceholder] = useState(type==='source' ? 'Pickup location' : 'Destination');

    const {source, setSource} = useContext(SourceContext);
    const {destination, setDestination} = useContext(DestinationContext);

    // Lay vi tuyen va kinh tuyen
    const getLatitudeAndLongitude = (place, type) => {
        const placeId = place.value.place_id;
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails({placeId}, (place, status) => {

        if(status === 'OK' && place.geometry && place.geometry.location){
          console.log(place.geometry.location.lat(), place.geometry.location.lng());

          if(type === 'source'){
            setSource({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              name: place.formatted_address,
              label: place.name
            });
          }else{
            setDestination({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              name: place.formatted_address,
              label: place.name
            });
          }
        }
      });
    }

  return (
    <div className='flex items-center gap-4 bg-slate-200 p-3 rounded-lg mt-3'>
        <Image src={type==='source' ? '/circle.png' : '/circle.png'} alt="source" width={15} height={15} />
        {/* <input type='text' placeholder={type==='source' ? 'Pickup location' : 'Destination'} className='w-full bg-transparent outline-none'/> */}
        <GooglePlacesAutocomplete 
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            selectProps={{
                value,
                onChange: (place) => {getLatitudeAndLongitude(place, type); setValue(place);},
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