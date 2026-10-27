import Button from '@/components/Button';
import Input from '@/components/Input';
import api from '@/utils/api';
import useCustomMutation from '@/utils/api/hooks/useCustomMutation';
import { useLostPassword } from '@/utils/stores/LostPasswordStore';
import { rowdies } from 'fonts';
import { SubmitEvent } from 'react';
import { toast } from 'sonner';

export default function SendOtp() {
    const { setIsOtpSent, email, setEmail } = useLostPassword();
    const { mutateAsync: sendOtp, isPending: isSendingOtp } = useCustomMutation(
        {
            mutationFn: (data) => api.auth.forgotPassword(data),
            onSuccess: (responseData: any) => {
                setIsOtpSent(true);
                toast.success(responseData?.message || 'otp sent');
            },
        },
    );

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return toast.error('Email is Wrong!');
        await sendOtp({ email });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p className={`text-3xl ${rowdies.className}`}>Send Otp</p>
                <Input
                    placeholder='Email'
                    theme='accent'
                    isAnimated
                    className='mt-9 h-16 bg-root rounded-20 text-lg'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    isAnimated
                    theme='secondary'
                    shape='block'
                    className='border-2 rounded-20 border-primary mt-6 h-16 text-xl'
                    type='submit'
                    isLoading={isSendingOtp}
                >
                    Send Verification Code
                </Button>
            </form>
        </div>
    );
}
