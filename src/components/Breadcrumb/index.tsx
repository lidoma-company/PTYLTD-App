import Link from 'next/link';
import React from 'react';
import { BreadcrumbProps } from './breadcrumb.type';

const Breadcrumb = ({ breadcrumb }: { breadcrumb: BreadcrumbProps[] }) => {
    return (
        <div className='breadcrumbs text-sm'>
            <ul>
                {breadcrumb.map((item, i) => (
                    <li key={i} className='text-primary-7'>
                        <Link href={item.link}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Breadcrumb;
