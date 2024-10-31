'use client';

import { Template, RenderIf, InputText, Button, FieldError, useNotification, AnimatedLoadingText } from '@/components';
import { useState, useEffect } from 'react';
import { LoginForm, formScheme, validationScheme } from './formScheme';
import { useFormik } from 'formik';
import { useAuth } from '@/resources';
import { useRouter } from 'next/navigation';
import { AccessToken, Credentials, User } from '@/resources/user/user.resource';

export default function Login() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<boolean>(false);
    const [isClient, setIsClient] = useState<boolean>(false);
    const auth = useAuth();
    const notification = useNotification();
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
        setIsLoading(false);
    }, []);

    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginForm>({
        initialValues: formScheme,
        validationSchema: validationScheme,
        onSubmit: onSubmit
    })

    async function onSubmit(values: LoginForm) {
        console.log(values);

        if(!newUser) {
            const credentials: Credentials = {
                email: values.email,
                password: values.password
            }

            try {
                const accessToken: AccessToken = await auth.authenticate(credentials);
                auth.initSession(accessToken);
                auth.isSessionValid();
                router.push('/gallery');
            } catch(error: any) {
                const message = error?.message;
                notification.notify(message, "error");
            }
        } else {
            const user: User = {
                email: values.email,
                name: values.name,
                password: values.password
            }

            try {
                await auth.save(user);
                notification.notify("User created successfully", "success");
                
                resetForm();
                setNewUser(false);
            } catch(error: any) {
                const message = error?.message;
                notification.notify(message, "error");
            }

        }

        
    }


    

    return (
            <Template loading={isLoading}>
                {isClient ? (
                    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                            <h2 className='mt-10 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900'>
                            {newUser ? 'Create New User' : 'Login to your account'} 
                            </h2>
                        </div>

                        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                            <form onSubmit={handleSubmit} className='space-y-2'>
                                <RenderIf condition={newUser}>
                                    <div>
                                        <label className='block text-sm font-medium leading-6 text-gray-900'>Name: </label>
                                    </div>
                                    <div className='mt-2'>
                                        <InputText id='name' 
                                                style='w-full'
                                                value={values.name}
                                                onChange={handleChange}/>
                                        <FieldError error={errors.name}/>
                                    </div>
                                </RenderIf>
                                <div>
                                    <label className='block text-sm font-medium leading-6 text-gray-900'>Email: </label>
                                </div>
                                <div className='mt-2'>
                                    <InputText id='email' 
                                                style='w-full'
                                                value={values.email}
                                                onChange={handleChange}/>
                                    <FieldError error={errors.email}/>
                                </div>
                                <div>
                                    <label className='block text-sm font-medium leading-6 text-gray-900'>Password: </label>
                                </div>
                                <div className='mt-2'>
                                    <InputText id='password' 
                                                type="password"
                                                style='w-full'
                                                value={values.password}
                                                onChange={handleChange}/>
                                    <FieldError error={errors.password}/>
                                </div>
                                <RenderIf condition={newUser}>
                                    <div>
                                        <label className='block text-sm font-medium leading-6 text-gray-900'>Retype Password: </label>
                                    </div>
                                    <div className='mt-2'>
                                        <InputText id='passwordMatch' 
                                                    type="password"
                                                    style='w-full'
                                                    value={values.passwordMatch}
                                                    onChange={handleChange}/>
                                        <FieldError error={errors.passwordMatch}/>
                                    </div>
                                </RenderIf>
                                <div>
                                    <RenderIf condition={newUser}>
                                        <Button type="submit" 
                                            style="bg-indigo-700 hover:bg-indigo-500" 
                                            label="Save"/>
                                        <Button type="button" 
                                            style="bg-red-700 hover:bg-red-500 mx-2" 
                                            label="Cancel"
                                            onClick={() => setNewUser(false)}/>

                                    </RenderIf>
                                    <RenderIf condition={!newUser}>
                                        <Button type="submit" 
                                            style="bg-indigo-700 hover:bg-indigo-500" 
                                            label="Sign In"/>
                                        <Button type="button" 
                                            style="bg-red-700 hover:bg-red-500 mx-2" 
                                            label="Sign Up"
                                            onClick={() => setNewUser(true)}/>
                                    </RenderIf>
                                </div>
                            </form>
                        </div>

                    </div>
                ) : (
                    <AnimatedLoadingText />
                )}
            </Template>
    )

}