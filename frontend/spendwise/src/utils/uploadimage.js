import {API_PATHS} from './apiPaths';
import axiosInstance from './axiosinstance';

const uploadImage = async (imageFile) => {
    const formData =  new FormData();
    // Append image file to form data
    formData.append('image', imageFile);

    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData,{
            headers: {
                'Content-type' : 'multipart/form-data', // Set header for upload
            },

        });
        return response.data; // return response data
    }catch (error) {
        console.error('Error uploading the image:', error);
        throw error; // rethrow error for handling
    }
};

export default uploadImage;