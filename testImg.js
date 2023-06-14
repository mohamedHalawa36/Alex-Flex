// const cloudinary = require("../middleWares/services/cloudinary");
// route.patch("/user",multerData(formats.imageFormats).single("img"),userController.addProfileImg)
// route.post("/user",multerData(formats.imageFormats).array("img"),userController.addCoverImg)
// route.delete("/user",userController.removeProfileImg)


exports.addProfileImg = (req, res, next) => {
  const { path } = req.file;
  cloudinary.uploader
    .upload(path, { folder: "img/user" })
    .then(({ secure_url, public_id }) => res.json({ secure_url, public_id }))
    .catch((error) => next(error));
};

exports.addCoverImg = async (req, res, next) => {
  try {
    const data=[]
    for (const { path } of req.files) {
      const {secure_url, public_id} = await cloudinary.uploader.upload(path, { folder: "img/cover" });
      data.push({ secure_url,public_id})
    }
    res.json({data})
  } catch (error) {
    next(error);
  }
 
};

exports.removeProfileImg = (req, res, next) => {
  const { public_id } = req.body;
  cloudinary.uploader
    .destroy(public_id)
    .then((data) => res.json(data))
    .catch((error) => next(error));
};


 //to Video 
//  add
    cloudinary.uploader
    .upload(path, { folder: "img/user",resource_type: 'video' })
    .then(({ secure_url, public_id }) => res.json({ secure_url, public_id }))
    .catch((error) => next(error));

//delete
    // cloudinary.uploader
    // .destroy(public_id,{
    //   resource_type: 'video'
    // })
    // .then((data) => res.json(data))
    // .catch((error) => next(error));