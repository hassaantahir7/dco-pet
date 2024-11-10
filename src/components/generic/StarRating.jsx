import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, size=12 }) => {
    return (
        <div className='flex'>
            {Array(5).fill().map((_, i) => (
                <FaStar 
                    key={i} 
                    className={`${i < rating ? 'text-yellow-500' : 'text-gray-300'} mr-1`} 
                    size={size} 
                />
            ))}
        </div>
    );
};

export default StarRating;