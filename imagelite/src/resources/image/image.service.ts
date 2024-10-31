import { Image } from './image.resource';
import { useAuth } from '@/resources';


class ImageService {

    baseUrl: string = process.env.NEXT_PUBLIC_API_URL + '/v1/images';
    auth = useAuth();

    async search(query: string = "", extension: string = ""): Promise<Image[]> {
        const userSession = this.auth.getUserSession();
        const url = `${this.baseUrl}?query=${query}&extension=${extension}`;
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${userSession?.accessToken}`
            }
        });
        return await response.json();
    }

    async save(data: FormData): Promise<string> {
        const userSession = this.auth.getUserSession();
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            body: data,
            headers: {
                "Authorization": `Bearer ${userSession?.accessToken}`
            }
        });

        return response.headers.get('location') ?? '';
    }

}

export const useImageService = () => new ImageService();