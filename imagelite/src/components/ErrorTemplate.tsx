import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { useState, useEffect } from 'react';

interface ErrorTemplateProps {
    children: React.ReactNode;
}

const ErrorHeader: React.FC = () => {
    return (
        <header className="bg-slate-900 text-white py-3">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link href="/gallery">
                    <h1 className="text-3xl font-bold">Imagelite</h1>
                </Link>
            </div>
        </header>
    );
};

const ErrorFooter: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                Developed by <a href="https://github.com/yurijserrano" className="text-white">Yuri Serrano</a>
            </div>
        </footer>
    )
}

export const ErrorTemplate: React.FC<ErrorTemplateProps> = ({ children }: ErrorTemplateProps) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            <ErrorHeader />
            <div className="container mx-auto mt-8 px-4">
                {children}
            </div>
            <ErrorFooter />
            {isClient && (
                <ToastContainer 
                    position="top-right" 
                    autoClose={7000}
                    hideProgressBar={false}
                    draggable={false}
                    closeOnClick={true}
                    pauseOnHover={true} 
                />
            )}
        </>
    );
};
