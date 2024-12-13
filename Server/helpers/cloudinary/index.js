import cloudinary from "cloudinary";
const cloud = cloudinary.v2;
import multer from "multer";

cloud.config({
  cloud_name: "duw5axtnf",
  api_key: "575397791129185",
  api_secret: "jJM5bFoWEAewrMWCTpqp2vxSsu0",
});

const storage = new multer.memoryStorage();

const imageUploadUtil = async (file) => {
  const result = await cloud.uploader.upload(file, { resource_type: "auto" });
  return result;
};

const upload = multer({ storage });

export { upload, imageUploadUtil };
