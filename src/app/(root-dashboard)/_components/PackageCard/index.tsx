import classNames from 'classnames';
import { rowdies } from 'fonts';
import Image from 'next/image';

interface IProps {
    userPackage: {
        id: number;
        package: string;
    };
}

export default function PackageCard({ userPackage }: IProps) {
    const classnames = classNames(
        'relative overflow-hidden h-48 w-full lg:w-[449px] px-9 py-11 rounded-3xl bg-gradient-to-r z-[1] flex items-center justify-center gap-8',
        {
            'from-secondary via-secondary-4 via-50% to-secondary':
                userPackage.package === 'Premium',
            'from-primary-7 via-[#ACACAC] via-50% to-primary-8':
                userPackage.package === 'Standard',
            'from-white via-white via-50% to-white': userPackage.id === 1,
        },
    );

    return (
        <div className={classnames}>
            <div className='absolute inset-0 shimmer rounded-3xl' />
            <div className='size-16 lg:size-24 rounded-full bg-white shrink-0 flex items-center justify-center relative z-10'>
                <Image
                    alt='PTYLTD'
                    src={`/images/${userPackage.package.toLowerCase()}.gif`}
                    width={85}
                    height={85}
                    className={`h-[85px] w-[85px] absolute shrink-0 ${userPackage.package === 'Premium' && '!w-[120px]'}`}
                />
            </div>

            <span
                className={`${rowdies.className} text-white font-bold text-2xl lg:text-[30px] whitespace-nowrap relative z-10`}
            >
                {userPackage.package} Account
            </span>
        </div>
    );
}
