import React from 'react';
import { TableType } from './table.types';

const Table = ({ headData, children, classname }: TableType) => {
    return (
        <div className={`mx-auto w-full max-w-6xl ${classname}`}>
            <div className='overflow-x-auto -scale-y-100 border border-[#B9B9B9] rounded-b-3xl rounded-t-lg'>
                <table className='table overflow-hidden bg-white -scale-y-100 w-full'>
                    <thead className='bg-yellow-1'>
                        <tr>
                            {headData.map((data, i) => (
                                <th className='bg-primary text-white' key={i}>
                                    {data}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {children}
                </table>
            </div>
        </div>
    );
};

export default Table;
