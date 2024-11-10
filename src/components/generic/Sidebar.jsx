import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineDashboard, MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FaChevronDown } from 'react-icons/fa';
import { AiOutlineQuestionCircle, AiOutlineRollback as AiOutlineReturn } from 'react-icons/ai';

import Logo from '../../data/LOGO.png';
import avatar from '../../data/placedolder_avatar.jpg';
import { useStateContext } from '../../contexts/ContextProvider';

import { useSelector } from 'react-redux';

const Sidebar = () => {
    
    const activeLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-white bg-dark-green text-md m-2";
    const inactiveLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white dark:text-gray-200 dark:hover:text-black hover:bg-dark-green m-2";
    const sidebarItem = "sidebar-item";

    const handleCloseSidebar = () => {
        if (screenSize < 900) {
          setActiveMenu(false);
        }
        setIsDropdownOpen(false);
    }

    const handleToggleDropdown = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setIsDropdownOpen(prev => !prev);
    }

    const handleClick = () => {
        navigate('/');
    }

    return (
        <div className="ml-3 h-screen
            md:overflow-hidden overflow-auto
            md:hover:overflow-auto pb-10">
            {activeMenu && (<>
                <div className="flex justify-between items-center">
                    <Link to="/" onClick={() => setActiveMenu(false)}
                        className="items-center">
                        <img src={Logo} alt="Logo" className="logo" />
                        {/* <span className="text-xl font-bold ml-2">Logo</span> */}
                    </Link>
                    <TooltipComponent content="Menu"
                        position="BottomCenter">
                        <button type="button" 
                            onClick={() => setActiveMenu((prevActiveMneu) => !prevActiveMneu)}
                            className="text-xl rounded-full 
                            p-3 hover:bg-light-gray 
                            block md:hidden text-white"
                        >
                            <MdOutlineCancel size={24} />
                        </button>
                    </TooltipComponent>
                </div>
                <div className="mt-10 pr-4">
                   {/* will add later */}
                </div>
            </>)}
        </div>
    )
}

export default Sidebar