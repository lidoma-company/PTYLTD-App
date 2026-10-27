'use client';

import { useLostPassword } from '@/utils/stores/LostPasswordStore';
import ResetPassword from './_components/ResetPassword';
import SendOtp from './_components/SendOtp';
import VerifyOtp from './_components/VerifyOtp';

export default function Page() {
    const { isOtpSent, isOtpVerify } = useLostPassword();

    const isShowResetPasswordForm = isOtpSent && isOtpVerify;

    return (
        <div className='mb-8'>
            {/* <p className={`text-3xl ${rowdies.className}`}>Send Otp</p> */}

            {!isOtpSent && <SendOtp />}
            {isOtpSent && !isOtpVerify && <VerifyOtp />}
            {isShowResetPasswordForm && <ResetPassword />}
        </div>
    );
}
