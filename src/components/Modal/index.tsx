'use client';

import React, { FC } from 'react';
import { ModalProps } from './modal.type';
import Close from '@/../public/icons/close.svg';
import Button from '../Button';
import { closeModal } from '@/utils/funcs/modal';
const Modal: FC<ModalProps> = ({ title, children, id, className }) => {
    return (
        <div>
            <dialog
                id={id}
                className={`modal modal-bottom sm:modal-middle ${className}`}
            >
                <div className='modal-box'>
                    <div className='flex items-center justify-between'>
                        <h3 className='font-bold text-lg'>{title}</h3>
                        <form
                            className='cursor-pointer'
                            onClick={() => closeModal(id)}
                        >
                            <Button
                                size='sm'
                                className='px-0 border-0'
                                theme='default'
                            >
                                <Close width={32} height={32} />
                            </Button>
                        </form>
                    </div>
                    <div className='py-4'>{children}</div>
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Modal;
