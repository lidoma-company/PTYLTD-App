'use client';
import { Toaster } from 'sonner';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

const ToastContainer = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
        const target = searchParams.get('toast');
        if (target === 'auth') {
            toast.success('Please login to access to this blog');
        }
    }, [searchParams]);

    return (
        <Toaster
            toastOptions={{
                style: {
                    fontFamily: 'var(--font-inter)',
                },
            }}
            position='top-center'
            richColors
        />
    );
};

export default ToastContainer;
