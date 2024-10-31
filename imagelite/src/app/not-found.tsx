'use client';

import { ErrorTemplate } from '@/components'
import { Home, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/resources";
import { useEffect, useState } from 'react';

export default function NotFound() {
  const router = useRouter();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState<string>('/login');
  const [buttonText, setButtonText] = useState<string>('Go to Login');
  const [ButtonIcon, setButtonIcon] = useState<any>(LogIn);

  useEffect(() => {
    const isValidSession = auth.isSessionValid();
    if (isValidSession) {
      setRedirectPath('/gallery');
      setButtonText('Return to Gallery');
      setButtonIcon(Home);
    }
    setIsLoading(false);
  }, []);

  const handleRedirect = () => {
    router.push(redirectPath);
  };

  if (isLoading) {
    return (
      <ErrorTemplate>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900"></div>
        </div>
      </ErrorTemplate>
    );
  }

  return (
    <ErrorTemplate>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="relative">
            <h1 className="text-[8rem] font-bold text-slate-900 animate-pulse relative z-10">
              404
            </h1>
            <div className="absolute inset-0 animate-ping opacity-25 bg-gradient-to-r from-slate-900 to-slate-700 blur-xl z-0" />
            <p className="text-2xl font-semibold text-slate-700 -mt-4">
              Not Found
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-slate-600 text-lg">
              The page you're looking for doesn't exist.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={handleRedirect}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors duration-200 hover:scale-105 transform"
            >
              <ButtonIcon className="w-5 h-5" />
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </ErrorTemplate>
  );
}