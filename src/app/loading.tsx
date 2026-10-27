import React from 'react';
import './loader.css';

const Spinner = () => {
    return (
        <div className='spinner-wrapper'>
            <div className='loader segment1'>
                <span></span>
                <i></i>
            </div>
            <div className='loader segment2'>
                <span></span>
                <i></i>
            </div>
            <div className='loader segment3'>
                <span></span>
                <i></i>
            </div>
        </div>
    );
};

export default Spinner;
