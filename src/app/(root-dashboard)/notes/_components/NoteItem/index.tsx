'use client';

import { rowdies } from 'fonts';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import Delete from '%/delete.svg';
import { Note } from '@/utils/types/DTO/notes.interface';
import { formatDate } from '@/utils/funcs/date';
import Link from 'next/link';
import { showModal } from '@/utils/funcs/modal';
import ConfirmDeleteNoteModal from '../ConfirmDeleteNote';
import Skeleton from '@/components/Skeleton';

const NoteItem: FC<Note> = ({ id, created_at, blog, note }) => {
    const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

    return (
        <div>
            <div className='p-2.5 bg-white rounded-20 flex items-center gap-x-10 flex-col gap-y-4 sm:flex-row'>
                <Link href={`/blogs/${blog.alias_title}`}>
                    <Skeleton classname='w-[9.375rem] h-[9.375rem] shrink-0'>
                        <Image
                            alt=''
                            src={blog.image}
                            width={150}
                            height={150}
                            className='aspect-[16/9] shrink-0 w-[9.375rem] h-[9.375rem] object-cover rounded-lg'
                        />
                    </Skeleton>
                </Link>

                <div className='flex flex-col w-full min-w-0'>
                    <Link
                        href={`/blogs/${blog.alias_title}`}
                        className='min-w-0'
                    >
                        <p className={`${rowdies.className} text-xl truncate`} title={blog.title}>
                            {blog.title}
                        </p>
                    </Link>

                    <p className='my-4 text-sm text-primary-3'>
                        {formatDate(created_at)}
                    </p>

                    <p>{note}</p>

                    <Delete
                        className='ml-auto mt-4 cursor-pointer'
                        onClick={() => {
                            setSelectedNoteId(id);
                            showModal('delete-note');
                        }}
                    />
                </div>
            </div>

            {/* Delete confirmation modal */}
            <ConfirmDeleteNoteModal noteId={selectedNoteId} />
        </div>
    );
};

export default NoteItem;
