'use client';

import { useAuth } from '@/resources';
import Login from './login/page';
import Gallery from './gallery/page';
import { useState, useEffect } from 'react';
import { Template, AnimatedLoadingText } from '@/components';


export default function Home() {
  
  const auth = useAuth();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Template loading={true}>
        <AnimatedLoadingText />
      </Template>
    );
  }

  const user = auth.getUserSession();
  
  if(!user) {
    return <Login />;
  }

  return (
    
      <Gallery />
        
  );
}
