'use client';
import React from 'react';
import NoteItem from './_components/NoteItem';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import api from '@/utils/api';
import { Note } from '@/utils/types/DTO/notes.interface';
import Spinner from '@/app/loading';

const Page = () => {
    const { data, isLoading } = useCustomQuery<Note[]>({
        queryFn: () => api.notes.list(),
        queryKey: ['NOTES'],
    });
    if (isLoading) {
        return <Spinner />;
    }
    if (!data || data.length === 0) {
        return ( 
            <p className='text-center py-10'>
                You have no notes at the moment.
            </p>
        );
    }
    return (
        <div className='grid gap-10.5 lg:grid-cols-2'>
            {data.map((item) => (
                <NoteItem key={item.id} {...item} />
            ))}
        </div>
    );
};

export default Page;
