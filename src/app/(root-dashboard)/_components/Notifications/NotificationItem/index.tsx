import React, { FC } from 'react';
import NotificationTick from '%/notification-tick.svg';
import { Notification } from '@/utils/types/DTO/notifications.interface';

const NotificationItem: FC<Notification> = ({ data, read_at }) => {
    const isRead = !!read_at;

    return (
        <div
            className={`
                bg-white p-4.5 rounded-4xl flex items-center gap-y-4 gap-x-9 
                max-w-5xl mx-auto flex-col sm:flex-row
                ${isRead ? 'opacity-60' : ''}
            `}
        >
            <div className="bg-primary size-15 rounded-full flex items-center justify-center shrink-0">
                <NotificationTick />
            </div>

            <p
                className={`
                    md:text-xl
                    ${isRead ? 'text-gray-400' : 'text-black'}
                `}
            >
                {data.message}
            </p>
        </div>
    );
};
export default NotificationItem;