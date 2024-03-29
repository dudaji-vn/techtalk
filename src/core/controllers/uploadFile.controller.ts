import axios from "axios";
import { CLOUDINARY_CONFIG } from "../../shared/const/cloudinary";

export interface ICloudinaryResponse {
  url: string;
  type: string;
  secure_url: string;
}
const UploadFileController = {
  uploadAudio: async (mediaFile: File, vocabularyId: string, myId: string, isClub?: boolean) => {
    const { cloudName, cloudiaryUrl, uploadPreset } = CLOUDINARY_CONFIG;
    const formData = new FormData();
    formData.append(`file`, mediaFile);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);
    try {
      let res = await axios.post<ICloudinaryResponse>(cloudiaryUrl, formData);
      return res.data.secure_url;
    } catch (err) {
      console.log(err);
      return "";
    }
  },
  uploadImage: async (mediaFile: File) => {
    const { cloudName, cloudiaryUrl, uploadPreset } = CLOUDINARY_CONFIG;
    const formData = new FormData();
    formData.append(`file`, mediaFile);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);
    try {
      let res = await axios.post<ICloudinaryResponse>(cloudiaryUrl, formData);
      console.log(res.data);
      return res.data.secure_url;
    } catch (err) {
      console.log(err);
      return "";
    }
  },
};
export default UploadFileController;
