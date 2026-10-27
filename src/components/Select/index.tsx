import React, { FC } from 'react';
import { SelectProps } from './select.type';
import classNames from 'classnames';
import { Size, Theme } from '@/utils/types/components/component-base.type';

const sizeClasses: Record<Size, string> = {
    xs: 'select-xs',
    sm: 'select-sm',
    md: 'select-md',
    lg: 'select-lg',
    xl: 'select-xl',
};
const themeClasses: Record<Theme, string> = {
    accent: 'select-accent',
    error: 'select-error',
    info: 'select-info',
    neutral: 'select-neutral',
    primary: 'select-primary',
    secondary: 'select-secondary',
    success: 'select-success',
    warning: 'select-warning',
    default: '',
};
const Select: FC<SelectProps> = ({
    options,
    className,
    theme = 'primary',
    size = 'md',
    ...rest
}) => {
    const classes = classNames(
        'select',
        {
            [`${themeClasses[theme]}`]: theme,
        },
        {
            [`${sizeClasses[size]}`]: size,
        },
        className,
    );
    return (
        <select defaultValue='' className={classes} {...rest}>
            <option value='' disabled>
                {options.title}
            </option>

            {options?.options?.map((opt, i) => (
                <option key={i} value={opt.value}>
                    {opt.title}
                </option>
            ))}
        </select>
    );
};

export default Select;
