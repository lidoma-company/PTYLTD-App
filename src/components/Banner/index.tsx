import Image from 'next/image';
import React from 'react';
import './style.css';

const Banner = ({
    children,
    src,
}: {
    children: React.ReactNode;
    src: string;
}) => {
    return (
        <div className='w-screen h-[930px] lg:h-screen min-h-96 relative -top-20'>
            <Image
                src={src}
                alt='PTYLTD'
                fill
                
                className='object-cover object-center -z-20'
            />

            <div className='absolute inset-0 bg-[#00000073] -z-10' />

            <div className='container relative z-10 flex flex-col justify-center h-full'>
                {children}
            </div>
        </div>
    );
};

export default Banner;
