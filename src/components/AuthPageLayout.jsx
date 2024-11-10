import React from 'react';

const AuthPageLayout = ({ image }) => {
    return (
        <div className='hidden sm:block sm:w-1/2 flex-grow md:flex flex-col items-center 
            justify-center col-one-content py-10 px-10 pb-5 sm:py-05 sm:px-10 sm:pb-5
            md:py-05 md:px-10 md:pb-5 lg:py-20 lg:px-30 lg:pb-5 xl:px-32 xl:pl-20 
            lg:-mr-18 xl:-mr-18 text-white bg-cover bg-center'
            style={{ backgroundImage: `url(${image})` }}>
        </div>
    );
}

export default AuthPageLayout;