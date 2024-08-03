import { CarListData } from '@/utils/CarListData'
import React from 'react'
import CarListItem from './CarListItem'

function CarListOption({distance}) {

    const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <>
    <div className='mt-5 p-5 overflow-auto h-[250px]'>
        <div className='font-bold text-[22px]'>Recomended</div>

        {
            CarListData.map((item, index) => (
                <div 
                className={`cursor-pointer p-2 rounded-md border-black px-4 ${activeIndex === index ? 'border-[3px]' : null}`}
                 onClick={() => setActiveIndex(index)}
                 >
                    <CarListItem car={item} distance={distance}/>
                </div>
            ))
        }
    </div>
    </>
  )
}

export default CarListOption