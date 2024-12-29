import axios from "axios";
import { API_URL } from "../utils/constants";

const sendAnalysis = async (
  data: FormData,
  setUploadProgress: (progress: number) => void
) => {
  try {
    const res = await axios.post(`${API_URL}/api/analyze`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const progress = progressEvent.total
          ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
          : 0;
        setUploadProgress(progress);
      },
    });
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Internal server error while uploading file");
    }
  }
};

export default { sendAnalysis };
