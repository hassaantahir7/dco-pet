import React, { useEffect, useState } from 'react';
import { StarRating } from '../../components';
import ArrowUpIcon from "../../data/icons/arrow_up.png"

const Filters = ({ defaultCategoryID,categories, breeds, brands, onFilterChange }) => {
    const [selectedCategoryID, setSelectedCategoryID] = useState(defaultCategoryID)
    
    const updateSlider = () => {
        const fromSlider = document.querySelector('#fromSlider');
        const toSlider = document.querySelector('#toSlider');
        fillSlider(fromSlider, toSlider, '#C6C6C6', 'var(--sliderColor)', toSlider)
    }

    useEffect(() => {
        try {
            // updateSlider()
        } catch (e) {
            console.log(e)
        }
    })
    return (
        <div className='flex overflow-x-auto sm:block'>
            <div className='flex-none sm:flex-auto'>
                <Accordion title={"Categories"} chlidren={categories.map((category, index) => {
                    return <div key={index} className={index < categories.length - 1 ? 'mb-1' : ''}>
                        <label className='flex items-center text-xs text-[#978698]'>
                            <input
                                type="radio"
                                // value={category.name}
                                checked={selectedCategoryID === category.id}
                                className='mr-2'
                                onChange={(e) => {
                                    setSelectedCategoryID(category.id)
                                    onFilterChange('category', category)
                                }}
                            />
                            {category.name}
                        </label>
                    </div>
                })}>
                </Accordion>

            </div>
             <div className='flex-none sm:flex-auto'>
                <Accordion title='Price' chlidren={
                    <div className='flex flex-col items-center'>
                        <div className="range_container">
                            <div className="sliders_control">
                                <input id="fromSlider" type="range" min={0} max={100} defaultValue={0} onInput={updateSlider} />
                                <input id="toSlider" type="range" min={0} max={100} defaultValue={50} onInput={updateSlider} />
                            </div>
                        </div>
                        <div className="w-full flex justify-between px-5 items-center text-[#978698]">
                            <span>KD 12</span>
                            <span>KD 100</span>
                        </div>
                    </div>
                }>

                </Accordion>
            </div>
            <div className='flex-none sm:flex-auto'>
                <Accordion title={"Brand"} chlidren={brands.map((brand, index) => (
                    <div key={index} className={index < brands.length - 1 ? 'mb-1' : ''}>
                        <label className='flex items-center text-xs text-[#978698]'>
                            <input
                                type="radio"
                                value={brand}
                                className='mr-2'
                                onChange={(e) => onFilterChange('brand', e.target.value, e.target.checked)}
                            />
                            {brand}
                        </label>
                    </div>
                ))}>
                </Accordion>
            </div>
            <div className='flex-none sm:flex-auto'>
                <Accordion title={"Breed"} chlidren={breeds.map((breed, index) => (
                    <div key={index} className={index < breeds.length - 1 ? 'mb-1' : ''}>
                        <label className='flex items-center text-xs text-[#978698]'>
                            <input
                                type="radio"
                                value={breed}
                                className='mr-2'
                                onChange={(e) => onFilterChange('breed', e.target.value, e.target.checked)}
                            />
                            {breed}
                        </label>
                    </div>
                ))}>
                </Accordion>
            </div> 
        </div>
    );
};

function Accordion({ chlidren, title = "ooo" }) {
    const [hidden, setHidden] = useState(false)
    return (
        <div className="pb-6 space-y-6">
            <div className="flex justify-between items-center cursor-pointer py-4 px-3 rounded-lg bg-gray-50" onClick={e => {
                setHidden(!hidden)
            }}>
                <h1 className="text-[#2B396B] text-sm font-semibold">{title}</h1>
                {/* <DownArrowIcon /> */}
                {/* <BsArrowDownCircle /> */}
                <img width={20} height={11} src={ArrowUpIcon} />
            </div>
            <div className={`px-4 overflow-none ${hidden ? "hidden" : "block"}`}>
                {chlidren}
            </div>

        </div>
    )
}

//
function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max - to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
      ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
      ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
}

export default Filters;