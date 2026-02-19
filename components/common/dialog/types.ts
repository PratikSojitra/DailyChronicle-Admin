export type DialogProps<T = object> = {
    open: boolean;
    onClose: () => void;
    showCloseButton?: boolean;
} & T;