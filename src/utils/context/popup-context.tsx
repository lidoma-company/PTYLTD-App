'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { BsX } from 'react-icons/bs';
import { FaDownload } from 'react-icons/fa6';
import { toast } from 'sonner';
import api from '../api';
import useCustomMutation from '../api/hooks/useCustomMutation';
import { PopupData, PopupFormValues } from '../types/components/popup.type';
import { createLeadSchema, CreateLeadType } from '../types/DTO/lead.interface';
import Anchor from '@/components/Anchor';

interface PopupFormProps {
    onSuccess: () => void;
}

const PopupForm = ({ onSuccess }: PopupFormProps) => {
    const { handleSubmit, control } = useForm<CreateLeadType>({
        resolver: zodResolver(createLeadSchema),
    });

    const { mutateAsync, isPending } = useCustomMutation({
        mutationFn: (values: CreateLeadType) => api.lead.add(values),
        onSuccess: () => {
            onSuccess();
            toast.success('Lead Sent Successfully');
        },
    });

    const onSubmitHandler: SubmitHandler<CreateLeadType> = async (values) => {
        await mutateAsync(values);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className='mt-5 space-y-4'
        >
            <div className='grid grid-cols-2 gap-4'>
                <Controller
                    control={control}
                    name='first_name'
                    render={({ field }) => (
                        <Input isAnimated placeholder='First name' {...field} />
                    )}
                />

                <Controller
                    control={control}
                    name='last_name'
                    render={({ field }) => (
                        <Input
                            isAnimated
                            placeholder='Last name'
                            autoComplete='family-name'
                            {...field}
                        />
                    )}
                />
            </div>

            <Controller
                control={control}
                name='email'
                render={({ field }) => (
                    <Input
                        isAnimated
                        placeholder='Email address'
                        autoComplete='email'
                        {...field}
                    />
                )}
            />

            <div className='grid grid-cols-2 gap-4'>
                <Controller
                    control={control}
                    name='zip_code'
                    render={({ field }) => (
                        <Input
                            isAnimated
                            placeholder='Postcode'
                            inputMode='numeric'
                            autoComplete='postal-code'
                            {...field}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name='mobile_number'
                    render={({ field }) => (
                        <Input
                            isAnimated
                            animatedText='Mobile'
                            placeholder='+61 412 345 678'
                            autoComplete='tel'
                            {...field}
                        />
                    )}
                />
            </div>

            <div className='[&>button]:w-full'>
                <Button type='submit' isLoading={isPending}>
                    Download Free Report <FaDownload />
                </Button>
                <p className='text-[10px] mt-1 text-gray-600'>
                    By clicking "Download Free Report", I accept the{' '}
                    <Anchor href='/privacy-policy' target='_blank'>Privacy Policy</Anchor> and{' '}
                    <Anchor href='/terms-and-conditions' target='_blank'>
                        Terms and Conditions
                    </Anchor>
                    .
                </p>
            </div>
        </form>
    );
};

/* -------------------------------------------------------------------------- */
/*  Context / Provider                                                        */
/* -------------------------------------------------------------------------- */
const LEAD_SUBMITTED_KEY = 'popup-lead-submitted';

interface PopupContextType {
    activePopup: PopupData | null;
    isLeadSubmitted: boolean;
    openPopup: (popup: PopupData) => void;
    closePopup: () => void;
}
const PopupContext = createContext<PopupContextType | undefined>(undefined);

interface PopupProviderProps {
    children: React.ReactNode;
    /** Called with the form values when the user submits the popup form. */
    onSubmit?: (values: PopupFormValues) => Promise<void> | void;
}

export const PopupProvider = ({ children }: PopupProviderProps) => {
    const [activePopup, setActivePopup] = useState<PopupData | null>(null);
    const [isLeadSubmitted, setIsLeadSubmitted] = useState(false);
    const [showDownloadBtn, setShowDownloadBtn] = useState(false);

    const markLeadSubmitted = useCallback(() => {
        setIsLeadSubmitted(true);
        try {
            localStorage.setItem(LEAD_SUBMITTED_KEY, '1');
        } catch {}
    }, []);

    const openPopup = useCallback(
        (popup: PopupData) => {
            if (isLeadSubmitted) return;
            setActivePopup(popup);
            setShowDownloadBtn(false);
        },
        [isLeadSubmitted],
    );

    const closePopup = useCallback(() => {
        setActivePopup(null);
        setTimeout(() => setShowDownloadBtn(false), 300);
    }, []);

    useEffect(() => {
        if (!activePopup) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closePopup();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activePopup, closePopup]);

    useEffect(() => {
        try {
            if (localStorage.getItem(LEAD_SUBMITTED_KEY) === '1') {
                setIsLeadSubmitted(true);
            }
        } catch {}
    }, []);

    const value = useMemo(
        () => ({ activePopup, isLeadSubmitted, openPopup, closePopup }),
        [activePopup, isLeadSubmitted, openPopup, closePopup],
    );

    return (
        <PopupContext.Provider value={value}>
            {children}
            {activePopup && (
                <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-primary-900/60 p-4 backdrop-blur-md transition-all duration-300 sm:p-6'>
                    <div
                        role='dialog'
                        aria-modal='true'
                        onClick={(e) => e.stopPropagation()}
                        className='relative w-full max-w-lg cursor-default overflow-hidden rounded-20 border border-secondary-200 bg-base-100 p-6 shadow-2xl transition-all duration-300 sm:p-8'
                    >
                        <button
                            type='button'
                            onClick={closePopup}
                            className='absolute right-4 top-4 z-20 flex size-10 cursor-pointer items-center justify-center rounded-full border bg-white text-primary-600 shadow-sm transition-all duration-200 hover:bg-primary-500 hover:text-primary sm:bg-secondary-100'
                            aria-label='Close popup'
                        >
                            <BsX className='size-5' />
                        </button>

                        {activePopup.image && (
                            <div className='-mx-6 -mt-6 mb-4 sm:-mx-8 sm:-mt-8'>
                                <Image
                                    src={activePopup.image}
                                    alt={activePopup.id.toString()}
                                    width={800}
                                    height={800}
                                    sizes='(min-width: 640px) 512px, 100vw'
                                    className='h-48 w-full object-cover object-top sm:h-45'
                                    priority
                                />
                            </div>
                        )}

                        {activePopup.description && !showDownloadBtn && (
                            <p className='mt-2 text-sm font-semibold leading-relaxed text-primary-800'>
                                {activePopup.description}
                            </p>
                        )}

                        {!showDownloadBtn ? (
                            <PopupForm
                                key={activePopup.id}
                                onSuccess={() => {
                                    markLeadSubmitted();
                                    setShowDownloadBtn(true);
                                }}
                            />
                        ) : (
                            <div className='mt-8 flex flex-col items-center justify-center space-y-5'>
                                <p className='text-center text-sm font-medium leading-relaxed text-green-600'>
                                    Your details have been successfully
                                    submitted. You can now download your free
                                    report.
                                </p>
                                {activePopup.attached && (
                                    <Button
                                        type='button'
                                        className='w-full'
                                        onClick={() => {
                                            const link =
                                                document.createElement('a');
                                            link.href =
                                                activePopup.attached as string;
                                            link.setAttribute(
                                                'download',
                                                'Proactive_Equities_Free_Report.pdf',
                                            );
                                            link.setAttribute(
                                                'target',
                                                '_blank',
                                            );
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);

                                            closePopup();
                                        }}
                                    >
                                        Download Report Now{' '}
                                        <FaDownload className='ml-2 inline-block' />
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </PopupContext.Provider>
    );
};

export const usePopup = () => {
    const context = useContext(PopupContext);
    if (!context) {
        throw new Error('usePopup must be used within a PopupProvider');
    }
    return context;
};
