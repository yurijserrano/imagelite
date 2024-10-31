'use client';

import { ToastContainer } from "react-toastify";
import { useAuth } from "@/resources";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { AnimatedLoadingText } from "./AnimatedLoadingText";


interface TemplateProps {
    children: React.ReactNode;
    loading?: boolean;
}

const ClientSideHeader: React.FC = () => {
    const auth = useAuth();
    const user = auth.getUserSession();
    const router = useRouter();
    const isValidSession = auth.isSessionValid();

    // Redirect to login if session is invalid
    useEffect(() => {
        if (!isValidSession) {
            auth.invalidateSession();
            router.push("/login");
        }
    }, [isValidSession]);

    function logout() {
        auth.invalidateSession();
        router.push("/login");
    }

    return (
        <header className="bg-slate-900 text-white py-3">
            <div className="container mx-auto flex justify-between items-center px-4">
                <Link href="/gallery">
                    <h1 className="text-3xl font-bold">Imagelite</h1>
                </Link>
                <RenderIf condition={!!user && isValidSession}>
                    <div className="flex items-center">
                        <div className="relative">
                            <span className="w-64 py-3 px-6 text-md">
                                Hello, {user?.name}
                            </span>
                            <span className="w-64 py-3 px-6 text-sm">
                                <a href="#" onClick={logout}>
                                    Logout
                                </a>
                            </span>
                        </div>
                    </div>
                </RenderIf>
            </div>
        </header>
    );
};


export const Template: React.FC<TemplateProps> = ({ children, loading = false }: TemplateProps) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto mt-8 px-4">
                {loading ? (
                    <AnimatedLoadingText />
                ) : (
                    children
                )}
            </main>
            <Footer />
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
        </div>
    );
};

interface RenderIfProps {
    condition?: boolean;
    children: React.ReactNode;
}

export const RenderIf: React.FC<RenderIfProps> = ({ condition = true, children }: RenderIfProps) => {
    if(condition) {
        return children;
    }

    return null;
}

const LoadingSpinner: React.FC = () => {
    return (
        <div role="status" className="flex items-center justify-center">
            <div className="h-8 w-8">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>
        </div>
    );
};


const LoadingPlaceholder: React.FC = () => {
    return (
        <div role="status" className="flex items-center justify-center">
            <div className="h-8 w-8">
                <div className="h-full w-full rounded-full border-4 border-gray-300"></div>
            </div>
        </div>
    );
};

const Loading: React.FC = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="flex items-center justify-center">
            {isClient ? <LoadingSpinner /> : <LoadingPlaceholder />}
        </div>
    );
};



const Header: React.FC = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient ? <ClientSideHeader /> : (
                <header className="bg-slate-900 text-white py-3">
                    <div className="container mx-auto flex justify-between items-center px-4">
                        <h1 className="text-3xl font-bold">Imagelite</h1>
                    </div>
                </header>
            )}
        </>
    );
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                Developed by <a href="https://github.com/yurijserrano" className="text-white">Yuri Serrano</a>
            </div>
        </footer>
    )
}

