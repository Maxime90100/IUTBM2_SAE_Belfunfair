import multer from "multer"
import sharp from "sharp"
import ImagesService from "../services/images.service.js";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
const uploadFiles = upload.array("images", 10);

export const uploadImages = (req, res, next) => {
    uploadFiles(req, res, err => {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_UNEXPECTED_FILE") {
                return res.status(400).send("Too many files to upload.");
            }
        } else if (err) {
            return res.status(400).send(err);
        }
        next();
    });
};

export const resizeImages = async (req, res, next) => {
    if (!req.files) next();

    req.body.images = [];
    let type = req.body.type
    let id = req.params.id

    await Promise.all(
        req.files.map(async file => {
            const filename = file.originalname.replace(/\..+$/, "");
            const newFilename = `image-${type}-${id}-${filename}-${Date.now()}.jpeg`;

            await sharp(file.buffer)
                //.resize(128, 128)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(`public/img/upload/${newFilename}`);

            req.body.images.push(newFilename);
        })
    );

    let imageService = new ImagesService()
    await imageService.addImage(type,id);
    next();
};

export const deleteImage = async (req,res,next)=>{
    let type = req.body.type
    let id = req.params.id
    let paths = req.body.path

    if(paths === undefined)
        next()

    let checked = {paths:[]}
    if(Array.isArray(paths)){
        for (let i=0; i<paths.length; i++){
            checked.paths.push(paths[i])
        }
    }else{checked.paths.push(paths)}

    let service = new ImagesService()
    for (let path in checked.paths){
        await service.deleteImage(type,id,checked.paths[path]);
    }
    next()
}