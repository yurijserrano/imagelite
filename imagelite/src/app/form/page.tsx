"use client";

import { Template, InputText, Button, RenderIf, useNotification, FieldError, AuthenticatedPage } from "@/components";
import { useFormik } from "formik";
import { useState } from "react";
import { useImageService } from "@/resources/image/image.service";
import { FormProps, formScheme,formValidationScheme } from "@/app/form/formScheme";
import Link from "next/link";




export default function Form() {

    const [imagePreview, setImagePreview] = useState<string>('');
    const imageService = useImageService();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const notification = useNotification();

    const formik = useFormik<FormProps>({
        initialValues: formScheme,
        onSubmit: handleSubmit,
        validationSchema: formValidationScheme
    });

    async function handleSubmit(data: FormProps) {
        setIsLoading(true);
        console.log(data);

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('tags', data.tags);
        formData.append('file', data.file);

        await imageService.save(formData);

        formik.resetForm();
        setImagePreview('');

        setIsLoading(false);

        notification.notify('Image saved successfully', 'success');
    }

    function onFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            formik.setFieldValue('file', file);
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }
    }


    return (
        <AuthenticatedPage>
            <Template loading={isLoading}>

                <section className="flex flex-col items-center justify-center my-5">
                    <h5 className="mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900">New Image</h5>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Name: *</label>
                            <InputText id="name" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.name}
                                    placeholder="Type the image's name" />
                            <FieldError error={formik.errors.name} />
                        </div>

                        <div className="mt-5 grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Tags: *</label>
                            <InputText id="tags" 
                                onChange={formik.handleChange}
                                value={formik.values.tags} 
                                placeholder="Type the tags comma separated" />
                                <FieldError error={ formik.errors.tags } />
                        </div>


                        <div className="mt-5 grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Image: *</label>
                            <FieldError error={ formik.errors.file } />
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    
                                    <RenderIf condition={!imagePreview}>
                                        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                        </svg>
                                    </RenderIf>

                                    <div className="mt-4 flex text-sm leading-6 text--gray-600">
                                        <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600">
                                            <RenderIf condition={!imagePreview}>
                                                <span>Click to upload</span>
                                            </RenderIf>

                                            <RenderIf condition={!!imagePreview}>
                                                <img src={imagePreview} width={250} className="rounded-md" />
                                            </RenderIf>

                                            <input onChange={onFileUpload} type="file" className="sr-only" accept="image/*" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 flex items-center justify-center gap-x-4">
                            <Button style="bg-blue-500 hover:bg-blue-300" type="submit" label="Save" />
                            <Link href="/gallery">
                                <Button style="bg-red-500 hover:bg-red-300" type="button" label="Cancel" />
                            </Link>
                        </div>

                    </form>
                </section>

            </Template>
        </AuthenticatedPage>
    )
}