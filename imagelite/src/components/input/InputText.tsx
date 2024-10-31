import React from 'react';

interface InputTextProps {
    style?: string;
    placeholder?: string;
    id?: string;
    value?: string;
    type?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export const InputText: React.FC<InputTextProps> = ({ style,type = "text", ...props }: InputTextProps) => {
    return (
        <input type={type} 
            {...props}
            className={`${style} border px-3 py-2 rounded-lg text-gray-900`} />
    )
}