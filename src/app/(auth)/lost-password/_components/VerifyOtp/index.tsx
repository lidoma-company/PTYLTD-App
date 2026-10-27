import Button from '@/components/Button';
import Input from '@/components/Input';
import api from '@/utils/api';
import useCustomMutation from '@/utils/api/hooks/useCustomMutation';
import { useLostPassword } from '@/utils/stores/LostPasswordStore';
import { rowdies } from 'fonts';
import { SubmitEvent, useState } from 'react';
import { toast } from 'sonner';

export default function VerifyOtp() {
    const { setIsOtpVerify, email, setTempToken } = useLostPassword();
    const [otp, setOtp] = useState<string>('');
    const { mutateAsync: verifyOtp, isPending: isVerifyingOtp } =
        useCustomMutation({
            mutationFn: (data) => api.auth.verifyForgotPassword(data),
            onSuccess: (responseData: any) => {
                setIsOtpVerify(true);
                setTempToken(responseData?.token);
                toast.success(responseData?.message || 'otp verify');
            },
        });

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !otp) return toast.error('Email Wrong!');
        await verifyOtp({ email, otp });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p className={`text-3xl ${rowdies.className}`}>Verify Code</p>

                <Input
                    placeholder='Email'
                    theme='accent'
                    isAnimated
                    className='mt-9 h-16 bg-root rounded-20 text-lg'
                    value={email}
                    readOnly
                />

                <Input
                    placeholder='Code'
                    theme='accent'
                    isAnimated
                    className='mt-9 h-16 bg-root rounded-20 text-lg'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <Button
                    isAnimated
                    theme='secondary'
                    shape='block'
                    className='border-2 rounded-20 border-primary mt-6 h-16 text-xl'
                    type='submit'
                    isLoading={isVerifyingOtp}
                >
                    Verification Code
                </Button>
            </form>
        </div>
    );
}
