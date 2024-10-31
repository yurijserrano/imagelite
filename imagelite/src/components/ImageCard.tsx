'use client';

interface ImageCardProps {
    name?: string;
    size?: string;
    uploadDate?: string;
    src?: string;
    extension?: string;
}



export const ImageCard: React.FC<ImageCardProps> = ({
    name, size, uploadDate, src, extension
}: ImageCardProps) => {

    function downloadImage() {
        window.open(src, '_blank');
    }

    function parseSize(size: string | undefined): number {
        if (!size) return 0;
        return parseInt(size, 10);
    }

    function convertBytesToSize(bytes: number = 0, decimals = 2){
        if (!bytes) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    return (
        <div className="group relative bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl overflow-hidden w-[320px]">
            {/* Imagem Container */}
            <div className="relative w-full pt-[100%]">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 to-gray-900/50">
                    <img 
                        src={src} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        alt={name || "Image"} 
                    />
                </div>
                
                {/* Overlay com informações hover */}
                <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button 
                        onClick={downloadImage}
                        className="bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                        Download Image
                    </button>
                </div>
            </div>

            {/* Informações */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent text-white">
                <h5 className="text-xl font-semibold mb-1 transform translate-y-0 group-hover:translate-y-[-4px] transition-transform duration-300">
                    {name}
                </h5>
                <div className="space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm text-gray-200">{extension}</p>
                    <p className="text-sm text-gray-200">{convertBytesToSize(parseSize(size))}</p>
                    <p className="text-sm text-gray-200">{uploadDate}</p>
                </div>
            </div>
        </div>
    );
}