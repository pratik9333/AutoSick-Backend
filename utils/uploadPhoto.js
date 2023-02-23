const cloudinary = require("cloudinary");

const uploadPhotoAndReturnUrl = async (folder, req) => {
  try {
    //uploading file to cloudinary
    const result = await cloudinary.v2.uploader.upload(
      req.files.photo.tempFilePath,
      {
        folder,
        crop: "scale",
      }
    );

    return {
      id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    return false;
  }
};

const deletePhoto = async (imageId) => {
  try {
    //delete photo from cloudinary
    await cloudinary.v2.uploader.destroy(imageId);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { uploadPhotoAndReturnUrl, deletePhoto };
