import './style.css';

const VerticalText = () => {
    return (
        <div className='flex ml-auto -mt-5'>
            <div className='h-[15em] w-10 relative overflow-hidden'>
                <p className='text typing-vertical-animation tracking-[0.2em] uppercase'>
                    proactive
                </p>
            </div>
            <div className='h-[14em] w-10 relative overflow-hidden'>
                <p className='text typing-vertical-animation-2  tracking-[0.2em] uppercase'>
                    equities
                </p>
            </div>
        </div>
    );
};

export default VerticalText;
