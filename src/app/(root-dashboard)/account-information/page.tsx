'use client';
import Input from '@/components/Input';
import React, { useState, useEffect } from 'react';
import UserEdit from '%/user-edit.svg';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import VerifyMobile from './_components/VerifyMobile';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import { GetMeResponse } from '@/utils/types/DTO/get-me.interface';
import useCustomMutation from '@/utils/api/hooks/useCustomMutation';
import api from '@/utils/api';
import { toast } from 'sonner';
import ChangePassword from './_components/ChangePassword';

const Page = () => {
    const { data, isLoading, refetch } = useCustomQuery<GetMeResponse>({
        queryFn: () => api.auth.getMe(),
        queryKey: ['GET_ME'],
    });

    const userData = data?.user;

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        zip_code: '',
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                zip_code: (userData as any)?.zip_code || '',
            });
        }
    }, [userData]);

    const { mutateAsync, isPending } = useCustomMutation({
        mutationFn: (payload: any) => api.auth.editProfile(payload),
        onSuccess: async (responseData: any) => {
            await refetch();
            toast.success(
                responseData?.message || 'Profile updated successfully!',
            );
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await mutateAsync(formData);
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return <div className='p-8 text-center font-bold'>Loading...</div>;
    }

    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                <Input
                    icon={<UserEdit />}
                    name='first_name'
                    value={formData.first_name}
                    onChange={handleChange}
                    theme='accent'
                    isAnimated
                    placeholder='First Name'
                    className='max-w-md'
                />
                <Input
                    icon={<UserEdit />}
                    name='last_name'
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder='Last Name'
                    theme='accent'
                    isAnimated
                    className='max-w-md'
                />

                <Input
                    name='zip_code'
                    value={formData.zip_code}
                    onChange={handleChange}
                    placeholder='Zip Code'
                    theme='accent'
                    isAnimated
                    className='max-w-md'
                />

                <div className='flex items-end'>
                    <Button
                        theme='primary'
                        className='w-fit rounded-2xl'
                        isAnimated
                        onClick={handleSubmit}
                        disabled={isPending}
                    >
                        {isPending ? 'Updating…' : 'Submit'}
                    </Button>
                </div>
            </div>

            <Divider classname='my-12'>Verify Mobile Number</Divider>

            <VerifyMobile />

            <ChangePassword />
        </>
    );
};

export default Page;
