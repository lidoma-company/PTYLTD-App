import React, { FC } from 'react';
import { BadgeProps, BadgeVariant } from './badge.type';
import classNames from 'classnames';
import { Size, Theme } from '@/utils/types/components/component-base.type';

const variantClasses: Record<BadgeVariant, string> = {
    dash: 'badge-dash',
    outline: 'badge-outline',
    soft: 'badge-soft',
};
const themeClasses: Record<Theme, string> = {
    accent: 'badge-accent',
    error: 'badge-error',
    info: 'badge-info',
    neutral: 'badge-neutral',
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    default: '',
};
const sizeClasses: Record<Size, string> = {
    xs: 'badge-xs',
    sm: 'badge-sm',
    md: '',
    lg: 'badge-lg',
    xl: 'badge-xl',
};
const Badge: FC<BadgeProps> = ({
    children,
    variant = 'outline',
    size = 'md',
    theme = 'primary',
    classname,
}) => {
    const classes = classNames(
        'badge',
        {
            [`${variantClasses[variant]}`]: variant,
        },
        { [`${sizeClasses[size]}`]: size },
        { [`${themeClasses[theme]}`]: theme },
        classname
    );
    return <div className={classes}>{children}</div>;
};

export default Badge;

