import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default function handler(req, res) {
  if (req.method === "POST") {
    const { formData } = req.body;
    console.log("Config is ", cloudinary.config);

    cloudinary.uploader
      .upload(formData, { upload_preset: "ml_default" })
      .then((result) => {
        console.log("Upload successful:", result);
        res.status(200).json({ url: result.secure_url });
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        res.status(500).json({ error: "Upload failed" });
      });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
