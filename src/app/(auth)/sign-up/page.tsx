'use client';
import Input from '@/components/Input';
import User from '%/user.svg';
import Password from '%/password.svg';
import Email from '%/email-solid.svg';
import ConfirmPassword from '%/password-broken.svg';
import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';
import { rowdies } from 'fonts';
import Anchor from '@/components/Anchor';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/components/ErrorMessage';
import { signupSchema, SignupType } from './_schemas/sign-up.schema';
import api from '@/utils/api';
import useCustomMutation from '@/utils/api/hooks/useCustomMutation';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { track } from 'next-pixels';
import { TbPinnedFilled } from 'react-icons/tb';
import { HiPhone } from 'react-icons/hi2';

const Page = () => {
    const router = useRouter();
    const isfirstView = useRef(false);
    const searchParams = useSearchParams();

    const reason = searchParams.get('reason');
    const redirectTo = searchParams.get('redirectTo');
    const planId = searchParams.get('planId');

    const isAuthBlog = reason === 'auth-blog';
    const isAuthVideo = reason === 'auth-video';

    useEffect(() => {
        if (!reason || isfirstView.current) return;
        isfirstView.current = true;

        if (reason === 'auth-blog') {
            toast.info('To read the blog, you need to register/login.', {
                duration: Infinity,
                closeButton: true,
            });
        } else if (reason === 'auth-video') {
            toast.info('To watch the video, you need to register/login.', {
                duration: Infinity,
                closeButton: true,
            });
        }
    }, [reason]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<SignupType>({
        resolver: zodResolver(signupSchema),
    });

    const { mutate, isPending } = useCustomMutation<SignupType, void>({
        mutationFn: (data: SignupType) => api.auth.signUp(data),

        onSuccess: () => {
            const formValues = getValues();

            track({
                eventName: 'CompleteRegistration',
                data: {
                    method: 'email',
                    status: 'pending_verification',
                    source: isAuthBlog
                        ? 'blog_access'
                        : isAuthVideo
                          ? 'video_access'
                          : redirectTo === 'checkout'
                            ? 'checkout'
                            : 'direct',
                    first_name: formValues.first_name,
                    last_name: formValues.last_name,
                },
            });

            toast.success('Register Successfully');

            sessionStorage.setItem('email', formValues.email);

            if (redirectTo) {
                sessionStorage.setItem('redirectTo', redirectTo);
            }

            if (planId) {
                sessionStorage.setItem('planId', planId);
            }

            router.push('/sign-up/verify');
        },
    });

    const onSubmit: SubmitHandler<SignupType> = (data) => {
        mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p className={`text-3xl ${rowdies.className}`}>SignUp</p>
            {(isAuthBlog || isAuthVideo) && (
                <p className='mt-4 font-semibold text-justify'>
                    To get access to this {isAuthVideo ? 'video' : 'article'}{' '}
                    and all our Insights and more, please log in to your
                    account, or open a free Basic Account now by simply filling
                    out the form below (No Credit Card Required)
                </p>
            )}
            <Input
                placeholder='First Name'
                theme='accent'
                icon={<User />}
                isAnimated
                className='mt-9 h-16 bg-root rounded-20 text-lg'
                {...register('first_name')}
            />
            <ErrorMessage errors={errors} field='first_name' />

            <Input
                placeholder='Last Name'
                theme='accent'
                icon={<User />}
                isAnimated
                className='mt-4 h-16 bg-root rounded-20 text-lg'
                {...register('last_name')}
            />
            <ErrorMessage errors={errors} field='last_name' />
            <Input
                placeholder='Email'
                theme='accent'
                icon={<Email />}
                isAnimated
                className='mt-4 h-16 bg-root rounded-20 text-lg'
                {...register('email')}
            />
            <ErrorMessage errors={errors} field='email' />
            <Input
                placeholder='Mobile Number'
                theme='accent'
                icon={<HiPhone color='#BABABA' size={25} />}
                isAnimated
                className='mt-4 h-16 bg-root rounded-20 text-lg'
                {...register('mobile_number')}
            />
            <ErrorMessage errors={errors} field='mobile_number' />
            <Input
                placeholder='Post Code'
                theme='accent'
                icon={<TbPinnedFilled color='#BABABA' size={25} />}
                isAnimated
                className='mt-4 h-16 bg-root rounded-20 text-lg'
                {...register('zip_code')}
            />
            <ErrorMessage errors={errors} field='zip_code' />
            <Input
                placeholder='Password'
                theme='accent'
                icon={<Password />}
                className='mt-4 h-16 bg-root rounded-20 text-lg'
                isAnimated
                type='password'
                {...register('password')}
            />
            <ErrorMessage errors={errors} field='password' />
            <Input
                placeholder='Confirm Password'
                theme='accent'
                icon={<ConfirmPassword />}
                className='mt-4 h-16 bg-root rounded-20 text-lg'
                isAnimated
                type='password'
                {...register('password_confirmation')}
            />
            <ErrorMessage errors={errors} field='password_confirmation' />

            <p className='mt-6! text-sm text-justify'>
                By submitting your details and clicking on the “SignUp Now”
                button below, you agree to Proactive Equities’{' '}
                <Anchor
                    theme='secondary'
                    href='/terms-and-conditions'
                    className='font-bold'
                >
                    Terms and Conditions
                </Anchor>{' '}
                and agree to receive marketing offers, including to be contacted
                by email or phone, as set out in our{' '}
                <Anchor
                    theme='secondary'
                    href='/privacy-policy'
                    className='font-bold'
                >
                    Privacy Policy
                </Anchor>
                , until you opt out.
            </p>

            <div className='mt-5.5'>
                <Checkbox size='xs' label='Remember me' defaultChecked />
            </div>
            <Button
                isAnimated
                theme='secondary'
                shape='block'
                className='border-2 rounded-20 border-primary mt-6 h-16 text-xl'
                type='submit'
                isLoading={isPending}
            >
                SignUp Now
            </Button>
            <div className='mt-3'>
                {' '}
                Do you have an account ?{' '}
                <Anchor
                    theme='secondary'
                    showUnderlineOnlyOnHover
                    href={'/login'}
                >
                    login
                </Anchor>
            </div>
        </form>
    );
};

export default Page;
