'use client';

import { useState, useEffect } from 'react';

export const AnimatedLoadingText: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Pequeno delay para garantir que a animação seja suave
        const timer = setTimeout(() => {
            setVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Versão não animada para o servidor e carregamento inicial
    if (!mounted) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <div className="text-4xl font-bold text-gray-700">
                    Loading...
                </div>
            </div>
        );
    }

    // Versão animada para o cliente
    return (
        <div className="flex justify-center items-center min-h-[200px]">
            <div className={`text-4xl font-bold text-gray-700 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                {visible && 'Loading'.split('').map((letter, index) => (
                    <span 
                        key={index} 
                        className="inline-block animate-pulse"
                        style={{
                            animationDelay: `${index * 0.15}s`,
                            animationDuration: '1.5s',
                        }}
                    >
                        {letter}
                    </span>
                ))}
            </div>
        </div>
    );
};