import { CarListData } from '@/utils/CarListData'
import React from 'react'
import CarListItem from './CarListItem'

function CarListOption({distance}) {

    const [activeIndex, setActiveIndex] = React.useState(0);

    const [selectedCar, setSelectedCar] = React.useState(CarListData[0]);

  return (
    <>
        <div className='font-bold text-[22px] mt-5'>Recomended</div>

    <div className='mt-5 p-5 overflow-auto h-[250px]'>

        {
            CarListData.map((item, index) => (
                <div 
                className={`cursor-pointer p-2 rounded-md border-black px-4 ${activeIndex === index ? 'border-[3px]' : null}`}
                 onClick={() => {setActiveIndex(index); setSelectedCar(item)} }
                 >
                    <CarListItem car={item} distance={distance}/>
                </div>
            ))
        }
    </div>

    {selectedCar ? <div className='flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center rounded-lg'>
        <h2>Make Payment For</h2>
        <button className='p-3 bg-black text-white rounded-lg text-center'>Request {selectedCar.name}</button>
    </div>: null}
    </>
  )
}

export default CarListOption