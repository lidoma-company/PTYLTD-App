'use client';

import { useEffect } from 'react';
import { RotateCw, Home, AlertTriangle } from 'lucide-react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Fatal Global Error:', error);
    }, [error]);

    return (
        <html lang='en' dir='ltr'>
            <body className='flex min-h-screen w-full items-center justify-center bg-[var(--color-root)] p-4 font-sans text-[var(--color-primary-9)] antialiased'>
                {/* Decorative Background Elements */}
                <div className='pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden'>
                    <div className='h-[450px] w-[450px] rounded-full bg-[var(--color-secondary-2)]/30 blur-[130px]' />
                    <div className='absolute h-[320px] w-[320px] rounded-full bg-[var(--color-primary-1)]/50 blur-[110px]' />
                </div>

                {/* Floating Card Container */}
                <div className='relative z-10 w-full max-w-lg overflow-hidden border border-[var(--color-primary-2)] bg-[var(--color-netural-1)]/95 p-8 text-center shadow-2xl backdrop-blur-xl rounded-20 sm:p-12'>
                    {/* Top Decorative Line */}
                    <div className='absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-primary-3)] via-[var(--color-secondary-6)] to-[var(--color-primary-3)]' />

                    {/* Floating Icon Badge */}
                    <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-gradient-to-tr from-[var(--color-secondary-2)] to-[var(--color-primary-2)] p-1 rounded-20 shadow-md'>
                        <div className='flex h-full w-full items-center justify-center bg-white rounded-[16px]'>
                            <AlertTriangle className='h-10 w-10 text-[var(--color-secondary-6)] animate-pulse' />
                        </div>
                    </div>

                    {/* Category Pill */}
                    <div className='mb-3 inline-flex items-center gap-1.5 border border-[var(--color-secondary-3)] bg-[var(--color-secondary-2)]/40 px-3 py-1 text-xs font-semibold text-[var(--color-secondary-6)] rounded-10'>
                        <span className='h-1.5 w-1.5 rounded-full bg-[var(--color-secondary-6)]' />
                        CRITICAL SYSTEM FAULT
                    </div>

                    {/* Title & Description */}
                    <h1 className='not-found-title text-2xl font-black tracking-tight sm:text-3xl'>
                        Critical Error Encountered
                    </h1>
                    <p className='mt-3 text-sm leading-relaxed text-[var(--color-primary-7)]'>
                        A fatal application issue occurred at the root level.
                        You can attempt to restore the session or reload the
                        application entirely.
                    </p>

                    {/* Error Digest Block */}
                    {error?.digest && (
                        <div className='mt-6 border border-[var(--color-primary-2)] bg-[var(--color-netural-4)] p-3.5 text-left rounded-10'>
                            <div className='flex items-center justify-between text-[11px] font-medium text-[var(--color-primary-6)]'>
                                <span>SYSTEM TRACKING ID</span>
                                <span className='font-mono text-[10px] text-[var(--color-primary-5)]'>
                                    DIGEST
                                </span>
                            </div>
                            <code className='mt-1 block select-all break-all font-mono text-xs font-semibold text-[var(--color-primary-9)]'>
                                {error.digest}
                            </code>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className='mt-8 flex w-full flex-col gap-3 sm:flex-row'>
                        <button
                            onClick={() => reset()}
                            className='group flex flex-1 items-center justify-center gap-2 bg-[var(--color-primary-9)] px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[var(--color-primary-8)] active:scale-[0.98] rounded-10'
                        >
                            <RotateCw className='h-4 w-4 transition-transform duration-500 group-hover:rotate-180' />
                            <span>Retry Session</span>
                        </button>

                        <button
                            onClick={() => window.location.assign('/')}
                            className='group flex flex-1 items-center justify-center gap-2 border border-[var(--color-primary-3)] bg-white px-5 py-3.5 text-sm font-semibold text-[var(--color-primary-9)] shadow-sm transition-all duration-200 hover:border-[var(--color-secondary-6)] hover:bg-[var(--color-netural-5)] active:scale-[0.98] rounded-10'
                        >
                            <Home className='h-4 w-4 text-[var(--color-primary-7)] transition-colors group-hover:text-[var(--color-secondary-6)]' />
                            <span>Reload Home</span>
                        </button>
                    </div>

                    {/* Footer note */}
                    <p className='mt-6 text-[11px] text-[var(--color-primary-5)]'>
                        Contact engineering support if this issue persists
                        across reloads.
                    </p>
                </div>
            </body>
        </html>
    );
}
