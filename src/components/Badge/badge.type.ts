import { ComponentBase } from '@/utils/types/components/component-base.type';

export type BadgeProps = Omit<ComponentBase, 'isDisabled'> & {
    variant?: BadgeVariant;
    children: React.ReactNode;
};

export type BadgeVariant = 'soft' | 'outline' | 'dash';

