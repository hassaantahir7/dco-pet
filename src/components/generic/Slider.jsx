import React, { useState } from 'react';
import { StarRating } from '../../components';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Slider = ({ slidesToShow, controls, slides, type }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };
    
    const handleArrowClick = (direction) => {
        let slide = currentSlide;
        slide = direction === 'left' ? slide - slidesToShow : slide + slidesToShow;
        if (slide < 0) slide = slides.length - slidesToShow;
        if (slide >= slides.length) slide = 0;
        setCurrentSlide(slide);
    };

    return (
        <div className='slider relative flex flex-col items-center justify-center'>
            <div className={`slides flex overflow-x-auto 
                ${type === 'image-only' ? 'mx-4' : 'mx-0'} md:mx-12`}>
                {slides.slice(currentSlide, currentSlide + slidesToShow).map((slide, i) => (
                    <div key={i} className={`slide ${i === slidesToShow - 1 ? 'mr-0' : 'mr-1 md:mr-4'} ${type === 'image-only' ? 'w-2/3' : ''}`}>
                        {type === 'image-only' ? (
                            <div className='relative'>
                                <img src={slide.image} alt='Slide' className='w-full' />
                                <p className='flex items-center justify-center 
                                    text-blue font-semibold mt-2'>
                                    {slide.text}
                                </p>
                            </div>
                        ) : (
                            <div className='flex flex-col sm:flex-row mr-2'>
                                <img src={slide.image} alt='Slide' className='w-32 sm:w-auto' />
                                <div className='w-full sm:w-1/2 sm:ml-4 text-left text-white'>
                                    <StarRating rating={slide.rating} />
                                    <p className='my-4'>{slide.text}</p>
                                    <p>{slide.author}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {controls === 'arrows' && (
                <div className='arrows absolute top-14 md:top-1/2 left-0 right-0 
                    flex justify-between items-center'>
                    <button onClick={() => handleArrowClick('left')} 
                        className='bg-custom-blue md:bg-transparent md:border-gray-500 border 
                        rounded-full p-2.5 hover:bg-custom-blue hover:border-none'
                    >
                        <FaChevronLeft className='text-gray-400' />
                    </button>
                    <button onClick={() => handleArrowClick('right')} 
                        className='bg-custom-blue md:bg-transparent md:border-gray-500 border 
                        rounded-full p-2.5 hover:bg-custom-blue hover:border-none'
                    >
                        <FaChevronRight className='text-gray-400' />
                    </button>
                </div>
            )}
            {controls === 'dots' && (
                <div className='dots flex justify-center space-x-2 mt-8'>
                    {Array(Math.ceil(slides.length / slidesToShow)).fill().map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleDotClick(i * slidesToShow)}
                            className={`h-2 w-2 rounded-full ${Math.floor(currentSlide / slidesToShow) === i ? 'bg-green' : 'bg-white'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Slider;