'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertOctagon } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to console or monitoring service
        console.error(error);
    }, [error]);

    return (
        <div className='relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-[var(--color-root)] px-4 py-12'>
            {/* Background Glows matching secondary theme colors */}
            <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                <div className='h-[380px] w-[380px] rounded-full bg-[var(--color-secondary-2)]/40 blur-[120px]' />
                <div className='absolute h-[300px] w-[300px] rounded-full bg-[var(--color-primary-1)]/60 blur-[100px]' />
            </div>

            <div className='relative z-10 w-full max-w-md text-center'>
                {/* Main Card */}
                <div className='relative overflow-hidden border border-[var(--color-primary-2)] bg-[var(--color-netural-1)]/90 p-8 shadow-2xl backdrop-blur-xl rounded-20 sm:p-10'>
                    {/* Top Decorative Line */}
                    <div className='absolute top-0 left-1/2 h-1 w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-secondary-6)] to-transparent' />

                    {/* Badge */}
                    <div className='mb-6 inline-flex items-center gap-2 border border-red-200 bg-red-50 px-3.5 py-1.5 text-xs font-semibold text-[var(--color-error)] rounded-10'>
                        <span className='relative flex h-2 w-2'>
                            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75' />
                            <span className='relative inline-flex h-2 w-2 rounded-full bg-[var(--color-error)]' />
                        </span>
                        System Error
                    </div>

                    {/* Error Illustration Icon */}
                    <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-gradient-to-tr from-[var(--color-secondary-2)] to-[var(--color-primary-1)] p-0.5 shadow-inner rounded-20'>
                        <div className='flex h-full w-full items-center justify-center bg-white rounded-[18px]'>
                            <AlertOctagon className='h-10 w-10 text-[var(--color-secondary-6)]' />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className='not-found-title mb-3 text-2xl font-bold tracking-tight sm:text-3xl'>
                        Something went wrong!
                    </h1>

                    {/* Description */}
                    <p className='mb-6 text-sm leading-relaxed text-[var(--color-primary-7)]'>
                        An unexpected error occurred while processing your
                        request. You can try again or return to the home page.
                    </p>

                    {/* Digest / Tracking Code */}
                    {error?.digest && (
                        <div className='mb-6 border border-[var(--color-primary-2)] bg-[var(--color-netural-5)] p-3 text-left rounded-10'>
                            <div className='mb-1 flex items-center justify-between text-[11px] font-medium text-[var(--color-primary-6)]'>
                                <span>Error Code</span>
                                <span className='font-mono text-[10px] text-[var(--color-primary-5)]'>
                                    DIGEST
                                </span>
                            </div>
                            <code className='block select-all break-all font-mono text-xs font-semibold text-[var(--color-primary-9)]'>
                                {error.digest}
                            </code>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className='flex flex-col gap-3 sm:flex-row'>
                        <button
                            onClick={reset}
                            className='group flex flex-1 items-center justify-center gap-2 bg-[var(--color-primary-9)] px-5 py-3 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-[var(--color-primary-8)] active:scale-[0.98] rounded-10'
                        >
                            <RefreshCw className='h-4 w-4 transition-transform duration-500 group-hover:rotate-180' />
                            <span>Try Again</span>
                        </button>

                        <Link
                            href='/'
                            className='group flex flex-1 items-center justify-center gap-2 border border-[var(--color-primary-3)] bg-white px-5 py-3 text-sm font-medium text-[var(--color-primary-9)] shadow-sm transition-all duration-200 hover:border-[var(--color-secondary-6)] hover:bg-[var(--color-netural-4)] active:scale-[0.98] rounded-10'
                        >
                            <Home className='h-4 w-4 text-[var(--color-primary-7)] transition-colors group-hover:text-[var(--color-secondary-6)]' />
                            <span>Back Home</span>
                        </Link>
                    </div>

                    {/* Support Info */}
                    <p className='mt-6 text-xs text-[var(--color-primary-5)]'>
                        If the problem persists, please contact support.
                    </p>
                </div>
            </div>
        </div>
    );
}
