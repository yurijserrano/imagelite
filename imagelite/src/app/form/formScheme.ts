import * as Yup from 'yup';


export interface FormProps {
    name: string;
    tags: string;
    file: string | Blob;
}

export const formScheme: FormProps = { name: '', tags: '', file: '' };


export const formValidationScheme = Yup.object().shape({
    name: Yup.string().trim().required('Name is required!'),
    tags: Yup.string().trim().required('Tags are required!'),
    file: Yup.mixed<Blob>()
    .required('Select an image to upload!')
    .test('size', 'File size cannot be higher than 4 MB',  (file) => {
        return file.size <= 4000000;
    })
    .test('type', 'Only image files are allowed!', (file) => {
        return file.type === 'image/jpeg' || 
            file.type === 'image/png' || 
            file.type === 'image/gif' || 
            file.type === 'image/webp' ||
            file.type === 'image/tiff';
    })
});