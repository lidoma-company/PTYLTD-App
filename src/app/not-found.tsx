import Button from '@/components/Button';
import { rowdies } from 'fonts';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <p
                className={`not-found-title text-9xl md:text-[15rem] lg:text-[20rem] text-center ${rowdies.className}`}
            >
                404
            </p>
            <p className='not-found-text text-white text-center text-5xl md:text-7xl lg:text-8xl'>
                Not Found
            </p>
            <Link href={'/'}>
                <Button isAnimated className='mt-7 '>
                    {' '}
                    Back to home
                </Button>
            </Link>
        </div>
    );
}
