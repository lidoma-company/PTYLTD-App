'use client';
import React, { useState, useEffect } from 'react';
import { useDropzone, DropEvent, FileRejection } from 'react-dropzone';
import { Theme } from '@/utils/types/components/component-base.type';
import classNames from 'classnames';
import Button from '../Button';
import { DndProps } from './dnd';
import File from '%/file.svg';

const defaultAccept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
        '.docx',
    ],
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
    ],
    'text/csv': ['.csv'],
};

const Dnd: React.FC<DndProps> = ({
    onChange = () => {},
    onDrop: onDropProp,
    showDetails = false,
    children,
    classname,
    fileItemStyle,
    theme = 'primary',
    accept = defaultAccept,
    maxFiles = 1,
    allowMultiple = false,
    enableDownload = true,
    enableDelete = true,
    ...rest
}) => {
    const [files, setFiles] = useState<
        Array<File & { index: number; preview?: string }>
    >([]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept,
        multiple: allowMultiple,
        maxFiles,
        onDrop: (
            acceptedFiles: File[],
            fileRejections: FileRejection[],
            event: DropEvent,
        ) => {
            const newFiles = acceptedFiles.map((file, index) =>
                Object.assign(file, {
                    index,
                    preview: file.type.startsWith('image/')
                        ? URL.createObjectURL(file)
                        : undefined,
                }),
            );
            setFiles(newFiles);
            onChange(allowMultiple ? acceptedFiles : acceptedFiles[0]);

            if (onDropProp) {
                onDropProp(acceptedFiles, fileRejections, event);
            }
        },
        ...rest,
    });

    useEffect(() => {
        return () => {
            files.forEach((file) => {
                if (file.preview) URL.revokeObjectURL(file.preview);
            });
        };
    }, [files]);

    const deleteFile = (id: number) => {
        const updatedFiles = files.filter((_, i) => i !== id);
        setFiles(updatedFiles);
        onChange(allowMultiple ? updatedFiles.map((f) => f as File) : null);
    };

    const downloadFile = (id: number) => {
        const fileToDownload = files[id];
        if (fileToDownload) {
            const url = URL.createObjectURL(fileToDownload);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileToDownload.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    const themeClasses: Record<Theme, string> = {
        accent: 'bg-accent',
        error: 'bg-error',
        info: 'bg-info',
        neutral: 'bg-neutral',
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        success: 'bg-success',
        warning: 'bg-warning',
        default: '',
    };

    const dndClasses = classNames(
        themeClasses[theme],
        classname,
        isDragActive && 'border-primary-6 bg-primary-1/10',
    );

    const hasFile = files.length > 0;

    return (
        <section className='cursor-pointer'>
            <div {...getRootProps()} className={dndClasses}>
                <input {...getInputProps()} />

                {!hasFile && children}

                {hasFile && (
                    <div className='flex flex-col items-center justify-center h-full py-4 px-3'>
                        {files[0].preview ? (
                            <img
                                src={files[0].preview}
                                alt='preview'
                                className='h-16 w-16 object-cover rounded-lg mb-2'
                            />
                        ) : (
                            <div className='h-12 w-12 bg-primary-1 rounded-full flex items-center justify-center mb-2'>
                                <File className='text-primary-6' />
                            </div>
                        )}

                        <p className='text-sm font-medium text-center truncate max-w-full px-2'>
                            {files[0].name}
                        </p>
                        <p className='text-xs text-gray-500 mt-1'>
                            {(files[0].size / 1024).toFixed(1)} KB
                        </p>

                        {enableDelete && (
                            <button
                                type='button'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteFile(0);
                                }}
                                className='mt-3 text-xs text-error hover:underline'
                            >
                                Remove file
                            </button>
                        )}
                    </div>
                )}
            </div>

            {showDetails && files.length > 0 && (
                <aside className='mt-5 space-y-2'>
                    {files.map((file) => (
                        <div
                            key={file.name}
                            className={classNames(
                                'bg-white py-3 px-4 rounded flex items-center justify-between',
                                fileItemStyle,
                            )}
                            dir='ltr'
                        >
                            <div className='flex flex-col'>
                                <p className='text-primary font-bold'>
                                    {file.name}
                                </p>
                                <p className='text-gray-500 text-xs font-semibold'>
                                    {(file.size / 1000).toFixed(2)} KB
                                </p>
                            </div>
                            <div className='flex gap-3'>
                                {enableDelete && (
                                    <Button
                                        onClick={() => deleteFile(file.index)}
                                        theme='secondary'
                                        variant='soft'
                                    >
                                        Delete
                                    </Button>
                                )}
                                {enableDownload && (
                                    <Button
                                        onClick={() => downloadFile(file.index)}
                                        theme='info'
                                        variant='soft'
                                    >
                                        Download
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </aside>
            )}
        </section>
    );
};

export default Dnd;
