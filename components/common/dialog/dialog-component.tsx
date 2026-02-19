'use client';

import {
    Dialog as DialogBox,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import type { DialogProps as DialogPropsType } from './types';

const modalSizes = {
    sm: 'sm:max-w-md',
    md: 'sm:max-w-[640px]',
    lg: 'sm:max-w-[830px]',
    xl: 'sm:max-w-[1096px]',
    '2xl': 'sm:max-w-[1100px]',
};

type DialogProps = DialogPropsType<{
    title?: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: keyof typeof modalSizes;
    contentClassName?: string;
    footerClassName?: string;
    containerClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}>;

const Dialog = ({
    open,
    onClose,
    title,
    description,
    children,
    footer,
    size = 'md',
    contentClassName,
    containerClassName,
    footerClassName,
    titleClassName,
    descriptionClassName,
    showCloseButton,
    onSubmit,
}: DialogProps) => {
    console.log("🚀 ~ Dialog ~ onSubmit:", onSubmit)
    const content = (
        <>
            {title && (
                <DialogHeader>
                    <DialogTitle className={cn('text-2xl font-bold', titleClassName)}>
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription className={descriptionClassName}>
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>
            )}
            <div
                className={cn(
                    'no-scrollbar -mx-4 max-h-[80vh] overflow-y-auto px-4',
                    contentClassName,
                )}
            >
                {children}
            </div>
            {footer && (
                <DialogFooter className={footerClassName}>{footer}</DialogFooter>
            )}
        </>
    );

    return (
        <DialogBox open={open} onOpenChange={onClose}>
            <DialogContent
                className={cn('p-6', modalSizes[size], containerClassName)}
                showCloseButton={showCloseButton}
            >
                {onSubmit ? (
                    <form
                        onSubmit={(e) => {
                            onSubmit(e);
                        }}
                        className="grid w-full gap-4"
                    >
                        {content}
                    </form>
                ) : (
                    content
                )}
            </DialogContent>
        </DialogBox>
    );
};

export default Dialog;