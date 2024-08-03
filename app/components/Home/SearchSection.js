import React, { use, useContext, useEffect } from 'react'
import InputItem from './InputItem'
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';
import CarListOption from './CarListOption';

const SearchSection = () => {


  const {source, setSource} = useContext(SourceContext);
  const {destination, setDestination} = useContext(DestinationContext);

  const [distance, setDistance] = React.useState(0);

  const calculateDistance = () => {
    const dist = google.maps.geometry.spherical.computeDistanceBetween(
      {lat: source.lat, lng: source.lng},
      {lat: destination.lat, lng: destination.lng}
    );

    setDistance(dist/1000);
  }
  

  return (
    <>
    <div className='p-2 md:p-6 border-[2px] rounded-xl'>
        <p className='text-[20px] font-bold'>Get a ride</p>
        <InputItem type='source' />
        <InputItem type='destination' />
        <button className='w-full bg-black text-white p-3 mt-3 rounded-xl' onClick={() => calculateDistance()}>Search</button>
    </div>
    {distance ? <CarListOption distance={distance}/> : null}
    </>
  )
}

export default SearchSection