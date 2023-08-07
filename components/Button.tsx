import Image from 'next/image';
import { MouseEventHandler } from 'react';

interface Props {
    title: string;
    leftIcon?: string | null;
    rightIcon?: string | null;
    handleClick?: MouseEventHandler;
    isSubmitting?: boolean;
    type: 'button' | 'submit';
    bgColor?: string;
    textColor?: string;
}

export const Button = ({ title, leftIcon, rightIcon, handleClick, isSubmitting, type, bgColor, textColor }: Props) => {
    return (
        <button
            type={type || 'button'}
            disabled={isSubmitting || false}
            className={`flexCenter gap-3 px-4 py-3 
        ${textColor ? textColor : 'text-white'} 
        ${
            isSubmitting ? 'bg-black/50' : bgColor || 'bg-primary-purple'
        } rounded-xl text-sm font-medium max-md:w-full pointer`}
            onClick={handleClick}
        >
            {leftIcon ? <Image src={leftIcon} alt="left" width={14} height={14} /> : null}
            {title}
            {rightIcon ? <Image src={rightIcon} alt="left" width={14} height={14} /> : null}
        </button>
    );
};
