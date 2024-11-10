import React, { useState } from 'react';

const Tabs = ({ tabs, setActiveTab }) => {
    const [activeTabLocal, setActiveTabLocal] = useState(tabs[0].label);

    const handleTabClick = (label) => {
        setActiveTabLocal(label);
        if (setActiveTab) {
            setActiveTab(label);
        }
    };

    return (
        <div className='w-full main-wrap'>
            <div className="flex justify-center py-2 w-full border border-[#F2F2F2] bg-[#F2F2F2]">
                {tabs.map((tab, index) => (
                    <button 
                        key={index}
                        className={`text-lg md:text-md py-2 px-4 md:py-2 md:px-6 first:pl-0 
                            ${activeTabLocal === tab.label ? 'font-semibold text-custom-green' : 'text-gray-400'}`
                        }
                        onClick={() => handleTabClick(tab.label)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className='my-6 flex'>
                {tabs.map((tab, index) => (
                    activeTabLocal === tab.label && <div key={index}>{tab.content}</div>
                ))}
            </div>
        </div>
    );
}

export default Tabs;