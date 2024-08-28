import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { imageId } = req.body;

    try {
      const response = await cloudinary.v2.uploader.destroy(imageId);

      if (response.result === 'ok') {
        return res.status(200).json({ success: true, result: response });
      } else {
        return res.status(400).json({ success: false, result: response });
      }
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
