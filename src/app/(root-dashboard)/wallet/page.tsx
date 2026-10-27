import Input from '@/components/Input';
import { rowdies } from 'fonts';
import React from 'react';
import Dollar from '%/dollar.svg';
import Button from '@/components/Button';
import Image from 'next/image';
const page = () => {
    return (
        <div className='bg-white shadow-main border border-[#1B1F2326] rounded-4xl p-7 flex items-center max-w-5xl mx-auto flex-col md:flex-row'>
            <div className='w-full flex flex-col items-center md:items-start'>
                <p className={`text-2xl ${rowdies.className}`}>
                    Credit increase
                </p>
                <Input
                    theme='accent'
                    className='max-w-sm w-full text-xl font-semibold mt-8'
                    icon={<Dollar />}
                    placeholder='25,000'
                />
                <Button
                    isAnimated
                    shape='block'
                    className='max-w-sm mt-6 rounded-20 text-xl'
                >
                    Pay
                </Button>
            </div>
            <Image width={200} height={200} alt='' src={'/images/wallet.gif'} />
        </div>
    );
};

export default page;
