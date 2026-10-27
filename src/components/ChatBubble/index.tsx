
import Image from 'next/image';
import React from 'react';

const ChatBubble = ({
    children,
    isAnswer = false,
    image,
}: {
    children?: React.ReactNode;
    isAnswer?: boolean;
    image?: string;
}) => {
    const hasContent = React.Children.toArray(children).some(
        (child) =>
            typeof child !== 'string' || child.trim().length > 0
    );

    return (
        <div className="w-full min-w-0">
            {hasContent && (
                <div
                    className={`chat w-full min-w-0 ${
                        isAnswer ? 'chat-end' : 'chat-start'
                    }`}
                >
                    <div
                        className={`
                            chat-bubble
                            min-w-0
                            max-w-[85%]
                            sm:max-w-[75%]
                            whitespace-pre-wrap
                            wrap-anywhere
                            ${
                                isAnswer
                                    ? 'chat-bubble-secondary'
                                    : 'chat-bubble-primary'
                            }
                        `}
                    >
                        {children}
                    </div>
                </div>
            )}

            {image && (
                <div
                    className={`w-full flex ${
                        isAnswer ? 'justify-end' : 'justify-start'
                    }`}
                >
                    <Image
                        alt=""
                        width={1000}
                        height={1000}
                        className="size-40 max-w-full rounded-md object-cover"
                        src={image}
                    />
                </div>
            )}
        </div>
    );
};

export default ChatBubble;
