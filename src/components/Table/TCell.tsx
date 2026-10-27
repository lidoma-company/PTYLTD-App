import React from 'react';

const TCell = ({ children }: { children: React.ReactNode }) => {
    return (
        <td className='font-semibold whitespace-nowrap'>
            {children}
        </td>
    );
};

export default TCell;
