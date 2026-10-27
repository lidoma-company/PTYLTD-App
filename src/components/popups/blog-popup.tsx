'use client';
import api from '@/utils/api';
import useCustomQuery from '@/utils/api/hooks/useCustomQuery';
import { usePopup } from '@/utils/context/popup-context';
import { PopupData } from '@/utils/types/components/popup.type';
import { GetMeResponse } from '@/utils/types/DTO/get-me.interface';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const FIRST_OPEN_DELAY_MS = 15000;
const REOPEN_DELAY_MS = 30000;

const isValidPopup = (p?: PopupData | null): p is PopupData =>
    !!p && !!p.id && !!p.image;

export default function BlogPopup() {
    const { openPopup, activePopup, isLeadSubmitted } = usePopup();
    const hasShownRef = useRef(false);

    const {
        data: me,
        isLoading,
        isPending,
    } = useCustomQuery<GetMeResponse>({
        queryFn: () => api.auth.getMe(),
        queryKey: ['GET_ME'],
    });

    // Only guests need the popup, so don't fetch it for logged-in users.
    const { data: popupResponse } = useCustomQuery({
        queryKey: ['POPUP'],
        queryFn: () => api.popup.getOne(),
        enabled: !isPending && !me?.user && !isLeadSubmitted,
    });

    const pathname = usePathname();
    const popup = popupResponse;
    const isGuest = !isLoading && !me?.user;

    useEffect(() => {
        if (!isGuest || !isValidPopup(popup) || activePopup || isLeadSubmitted)
            return;

        const delay = hasShownRef.current
            ? REOPEN_DELAY_MS
            : FIRST_OPEN_DELAY_MS;

        const timerId = setTimeout(() => {
            hasShownRef.current = true;
            openPopup(popup);
        }, delay);

        return () => clearTimeout(timerId);
    }, [isGuest, popup, activePopup, isLeadSubmitted, openPopup, pathname]);

    return null;
}
