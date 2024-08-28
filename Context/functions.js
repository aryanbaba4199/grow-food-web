import axios from "axios";




const cloudinaryApi = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const cloudinarySecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
const cloudinaryName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloudinaryPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;

const deleteImageFromCloudinary = async (imageId) => {
    try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageId }),
        });
    
        const data = await response.json();    
    
    if (data.success) {
      console.log("Image deleted from Cloudinary");
      return data;
    } else {
      console.error("Image deletion failed:", response.data);
      return data;
    }
  } catch (e) {
    const data = {error : e, success : false}
    console.error("Error deleting image from Cloudinary:", e);
    return e;
  }
};

export default deleteImageFromCloudinary;



export const uploadImageToCloudinary = async(image)=>{
    try{
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", cloudinaryPreset);
        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
          formData
        );
        
        const data = {response : true, data : cloudinaryResponse.data}
        return data;
    }catch(e){
        const data = {response : false, error : e}
        return {data};
    }
}
