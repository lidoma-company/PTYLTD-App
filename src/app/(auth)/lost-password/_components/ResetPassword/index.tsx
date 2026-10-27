import Button from '@/components/Button';
import Input from '@/components/Input';
import api from '@/utils/api';
import useCustomMutation from '@/utils/api/hooks/useCustomMutation';
import { useLostPassword } from '@/utils/stores/LostPasswordStore';
import { rowdies } from 'fonts';
import { useRouter } from 'next/navigation';
import { SubmitEvent, useState } from 'react';
import { toast } from 'sonner';

export default function ResetPassword() {
    const {
        email,
        tempToken,
        setIsOtpSent,
        setIsOtpVerify,
        setTempToken,
        setEmail,
    } = useLostPassword();
    const [password, setPassword] = useState<string>('');
    const [password_confirmation, setPasswordConfirmation] =
        useState<string>('');
    const router = useRouter();

    const resetAll = () => {
        setIsOtpSent(false);
        setIsOtpVerify(false);
        setTempToken('');
        setEmail('');
    };

    const { mutateAsync: resetPassword, isPending: isResetingPassword } =
        useCustomMutation({
            mutationFn: (data) => api.auth.resetPassword(data),
            onSuccess: (responseData: any) => {
                toast.success(responseData?.message || 'password reset');
                resetAll();
                router.replace('/login');
            },
        });

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !tempToken || !password || !password_confirmation)
            return toast.error('Please fill all fields!');

        await resetPassword({
            token: tempToken,
            password,
            password_confirmation,
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p className={`text-3xl ${rowdies.className}`}>
                    Reset Password
                </p>
                <Input
                    placeholder='Password'
                    theme='accent'
                    isAnimated
                    className='mt-9 h-16 bg-root rounded-20 text-lg'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    placeholder='Confirm Password'
                    theme='accent'
                    isAnimated
                    className='mt-9 h-16 bg-root rounded-20 text-lg'
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <Button
                    isAnimated
                    theme='secondary'
                    shape='block'
                    className='border-2 rounded-20 border-primary mt-6 h-16 text-xl'
                    type='submit'
                    isLoading={isResetingPassword}
                >
                    Reset Password
                </Button>
            </form>
        </div>
    );
}
