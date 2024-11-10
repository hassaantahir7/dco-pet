import React from 'react';

const SkeletonLoader = () => (
    <div className="flex items-center space-x-4 animate-pulse">
        <div className="rounded-full bg-gray-400 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-400 rounded w-3/4"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-400 rounded"></div>
                <div className="h-4 bg-gray-400 rounded w-5/6"></div>
            </div>
        </div>
    </div>
);

export default SkeletonLoader;