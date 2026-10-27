import React, { FC } from 'react';
import { AlertProps, AlertThemes, AlertVariants } from './alert.type';
import classNames from 'classnames';

const Alert: FC<AlertProps> = ({
    children,
    icon,
    theme = 'default',
    variant = 'default',
    isResponsive = true,
    classname,
}) => {
    const themeClasses: Record<AlertThemes, string> = {
        default: '',
        error: 'alert-error',
        info: 'alert-info',
        success: 'alert-success',
        warning: 'alert-warning',
    };
    const variantClasses: Record<AlertVariants, string> = {
        default: '',
        dash: 'alert-dash',
        outline: 'alert-outline',
        soft: 'alert-soft',
    };
    const classes = classNames(
        'alert',
        {
            [`${themeClasses[theme]}`]: theme,
        },
        {
            [`${variantClasses[variant]}`]: variant,
        },
        {
            'alert-vertical  sm:alert-horizontal': isResponsive,
        },
        classname
    );
    return (
        <div role='alert' className={classes}>
            {icon}
            {children}
        </div>
    );
};

export default Alert;

