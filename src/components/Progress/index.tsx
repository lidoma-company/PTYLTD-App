'use client'
import classNames from 'classnames';
import React, { FC, useEffect, useRef, useState } from 'react';
import { ProgressProps } from './progress.type';
import { Theme } from '@/utils/types/components/component-base.type';

const themeClasses: Record<Theme, string> = {
    accent: 'progress-accent',
    error: 'progress-error',
    info: 'progress-info',
    neutral: 'progress-neutral',
    primary: 'progress-primary',
    secondary: 'progress-secondary',
    success: 'progress-success',
    warning: 'progress-warning',
    default: '',
};

const Progress: FC<ProgressProps> = ({
    value = 0,
    classname,
    theme = 'primary',
}) => {
    const [animatedValue, setAnimatedValue] = useState(value);
    const requestRef = useRef<number | null>(null);

    // Animate from old value to new value smoothly
    useEffect(() => {
        const start = animatedValue;
        const end = value;
        const duration = 300;
        const startTime = performance.now();

        const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const newValue = start + (end - start) * progress;
            setAnimatedValue(newValue);

            if (progress < 1) {
                requestRef.current = requestAnimationFrame(animate);
            }
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [value]);

    const classes = classNames(
        'progress transition-all duration-300 ease-in-out',
        themeClasses[theme],
        classname,
    );

    return <progress className={classes} value={animatedValue} max={100} />;
};

export default Progress;
