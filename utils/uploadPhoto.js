const cloudinary = require("cloudinary");

const uploadPhotoAndReturnUrl = async (folder, req, res) => {
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
    console.log(error);
    return res
      .status(500)
      .json({ error: "Photo failed to upload, please try again" });
  }
};

const deletePhoto = async (imageId, res) => {
  try {
    //delete photo from cloudinary
    await cloudinary.v2.uploader.destroy(imageId);
  } catch (error) {
    res.status(500).json({ error: "Photo failed to delete, please try again" });
  }
};

module.exports = { uploadPhotoAndReturnUrl, deletePhoto };
