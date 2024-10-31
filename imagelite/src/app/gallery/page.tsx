'use client';

import { Template, ImageCard, Button, InputText, useNotification, AuthenticatedPage, AnimatedLoadingText } from '@/components';
import { Image } from '@/resources/image/image.resource';
import { useState, useEffect } from 'react'; 
import { useImageService } from '@/resources';
import Link from 'next/link';

export default function Gallery() {
    const useService = useImageService();
    const notification = useNotification(); 
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('');
    const [extension, setExtension] = useState<string>('ALL');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        searchImages(false);
    }, []);

    async function searchImages(showNotification = true) {
        setIsLoading(true);

        try {
            const searchResult = await useService.search(
                query, 
                extension === 'ALL' ? '' : extension
            );
            
            setImages(searchResult);

            if(showNotification && !searchResult.length) {
                notification.notify('No results found', 'warning');
            }
        } catch (error){
            notification.notify('Error searching images', 'error');
        } finally {
            setIsLoading(false);
        }
    }

    function clearSearch() {
        setIsLoading(true);
        setQuery('');
        setExtension('ALL');
        
        
        setTimeout(() => {
            useService.search('', '')
                .then(searchResult => {
                    setImages(searchResult);
                })
                .catch(() => {
                    notification.notify('Error searching images', 'error');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 0);
    }

    function renderImageCard(image: Image) {
        return (
            <ImageCard
                key={image.url}
                name={image.name}
                size={image.size?.toString()}
                extension={image.extension}
                uploadDate={image.uploadDate}
                src={image.url}
            />
        )
    }

    function renderImageCards() {
        return images.map(renderImageCard);
    }

    const NoImagesFound = () => (
        <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="bg-gray-50 rounded-lg p-8 text-center max-w-lg">
                <svg
                    className="mx-auto h-24 w-24 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Images Found</h3>
                <p className="text-gray-600 mb-6">
                    We couldn't find any images matching your search criteria. Try adjusting your filters or upload a new image.
                </p>
                <div className="flex justify-center space-x-4">
                    <Button 
                        style="bg-blue-500 hover:bg-blue-300" 
                        label="Clear Search" 
                        onClick={clearSearch}
                    />
                    <Link href="/form">
                        <Button 
                            style="bg-yellow-500 hover:bg-yellow-300" 
                            label="Upload Image"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <AuthenticatedPage>
            <Template loading={isLoading}>
                <section className='flex flex-col items-center justify-center my-5'>
                    <div className='flex space-x-4'>
                        <InputText  
                            onChange={event => setQuery(event.target.value)}
                            placeholder="Type name or tags" 
                            value={query} 
                        />
                        <select 
                            value={extension}
                            onChange={event => setExtension(event.target.value)}
                            className="border px-4 py-2 rounded-lg text-gray-900"
                        >
                            <option value="ALL">All formats</option>
                            <option value="PNG">PNG</option>
                            <option value="GIF">GIF</option>
                            <option value="JPEG">JPEG</option>
                            <option value="WEBP">WEBP</option>
                            <option value="TIFF">TIFF</option>
                            <option value="BMP">BMP</option>
                        </select>
                        <Button 
                            style="bg-blue-500 hover:bg-blue-300" 
                            label="Search" 
                            onClick={() => searchImages(true)}
                        />
                        <Link href="/form">
                            <Button 
                                style="bg-yellow-500 hover:bg-yellow-300" 
                                label="Add image"
                            />
                        </Link>
                    </div>
                </section>

                {images.length > 0 ? (
                    <section className="grid grid-cols-3 gap-8">
                        {renderImageCards()}
                    </section>
                ) : (
                    !isLoading && <NoImagesFound />
                )}
            </Template>
        </AuthenticatedPage>
    );
}