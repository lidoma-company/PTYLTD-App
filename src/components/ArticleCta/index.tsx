import Link from 'next/link';
import React from 'react';

interface ArticleCtaProps {
    className?: string;
}

const ArticleCta: React.FC<ArticleCtaProps> = ({ className = '' }) => {
    return (
        <Link
            href='/sign-up'
            rel='noopener noreferrer'
            className={`block my-8 p-6 bg-gradient-to-r from-orange-50 to-orange-100/50 border-l-4 border-orange-500 rounded-r-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer no-underline ${className}`}
        >
            <p className='text-gray-800 text-base md:text-lg leading-relaxed m-0'>
                <strong className='text-orange-600 font-bold text-lg md:text-xl mb-1 block'>
                    Important Disclaimer:
                </strong>
                You're reading a free article that offers general opinions and
                insights. For{' '}
                <span className='font-semibold text-gray-900'>
                    exclusive, in-depth research, timely high-conviction
                    investment ideas, and actionable trade signals
                </span>{' '}
                designed to help you stay ahead, join Proactive Equities today
                by opening a{' '}
                <span className='text-orange-600 font-extrabold underline decoration-2 underline-offset-4 group-hover:text-orange-500 transition-colors'>
                    Free Basic Account now!
                </span>
            </p>
            <span className='block mt-3 text-sm font-medium text-gray-500 italic'>
                (No Credit Card Required)
            </span>
        </Link>
    );
};

export default ArticleCta;
