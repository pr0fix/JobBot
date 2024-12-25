import axios from "axios";

const uploadFile = async (
  file: FormData,
  setUploadProgress: (progress: number) => void
) => {
  try {
    await axios.post("https://httpbin.org/post", file, {
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
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Internal server error while uploading file");
    }
  }
};

export default { uploadFile };
