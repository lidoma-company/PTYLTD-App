import Link from 'next/link';

const SidebarCta = () => {
    return (
        <div className='mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl'>
            <div className='flex flex-col items-center text-center space-y-4'>
                <div className='bg-orange-500/10 p-3 rounded-full mb-2'>
                    <svg
                        className='w-8 h-8 text-orange-500 animate-pulse'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M13 10V3L4 14h7v7l9-11h-7z'
                        />
                    </svg>
                </div>

                <p className='text-slate-300 text-base leading-relaxed'>
                    For exclusive, in-depth research, timely high-conviction
                    investment ideas, and actionable trade signals designed to
                    help you stay ahead, join Proactive Equities today.
                </p>

                <Link
                    href='/sign-up'
                    className='w-full mt-4 inline-flex items-center justify-center px-6 py-3 text-base font-bold text-slate-900 bg-orange-500 rounded-xl hover:bg-orange-400 transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50'
                >
                    Open a Free Basic Account
                </Link>
            </div>
        </div>
    );
};

export default SidebarCta;
