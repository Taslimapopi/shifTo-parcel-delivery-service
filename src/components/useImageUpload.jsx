import axios from "axios";

const useImageUpload = () => {

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
      formData
    );

    return res.data.data.url; 
  };

  return { uploadImage };
};

export default useImageUpload;