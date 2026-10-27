'use client';

import { useQueryState } from 'nuqs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useMemo } from 'react';

interface MediaPaginationProps {
    totalPages: number;
}

const MediaPagination: React.FC<MediaPaginationProps> = ({ totalPages }) => {
    const [page, setPage] = useQueryState('page', {
        parse: (value) => parseInt(value) || 1,
        serialize: (value) => value.toString(),
        defaultValue: 1,
    });

    const currentPage = page;

    const getPageNumbers = () => {
        const pageRange = [];
        const numPagesToShow = 5;
        const startPage = Math.max(
            1,
            currentPage - Math.floor(numPagesToShow / 2),
        );
        const endPage = Math.min(totalPages, startPage + numPagesToShow - 1);

        if (startPage > 1) {
            pageRange.push(1);
            if (startPage > 2) pageRange.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pageRange.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pageRange.push('...');
            pageRange.push(totalPages);
        }

        return pageRange;
    };

    const displayPageNumbers = useMemo(getPageNumbers, [
        currentPage,
        totalPages,
    ]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPages;

    const baseClass =
        'flex items-center justify-center min-w-[2.5rem] h-10 px-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer rounded-2xl mx-1';
    const activeClass =
        '!bg-secondary !text-white hover:bg-blue-700 border-blue-600';
    const disabledClass = 'opacity-50 cursor-not-allowed bg-gray-50';

    return (
        <nav className='flex justify-center items-center -space-x-px'>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={isPrevDisabled}
                className={`${baseClass} ${isPrevDisabled ? disabledClass : ''}`}
            >
                <ChevronLeft className='w-5 h-5' />
            </button>

            {displayPageNumbers.map((p, index) =>
                p === '...' ? (
                    <span
                        key={`ellipsis-${index}`}
                        className={`${baseClass} cursor-default hover:bg-white`}
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={p}
                        onClick={() => handlePageChange(Number(p))}
                        className={`${baseClass} ${
                            Number(p) === currentPage ? activeClass : ''
                        }`}
                        disabled={Number(p) === currentPage}
                    >
                        {p}
                    </button>
                ),
            )}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isNextDisabled}
                className={`${baseClass} ${isNextDisabled ? disabledClass : ''}`}
            >
                <ChevronRight className='w-5 h-5' />
            </button>
        </nav>
    );
};

export default MediaPagination;
