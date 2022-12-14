import express from "express";
import * as controller from "../controllers/prestataires.controller.js";
import * as imageProcessor from "../middlewares/imagesProcessor.js";
const router = express.Router();

// MANEGES

router.get("/:id_user/manege/:id?", controller.showManeges);
router.post("/:id_user/addManege", controller.addManege);
router.post("/:id_user/manege/:id/update", /*imageProcessor.uploadImages, await imageProcessor.resizeImages,*/ controller.editManege);
router.post("/:id_user/manege/:id/delete", controller.deleteManege);
router.get("/:id_user/manege/:id/signup", controller.signupManege);
router.post("/:id_user/manege/:id/signupPost", controller.signupManegePOST);
//router.post("/:id_user/manege/:id/deleteImage", imageProcessor.deleteImage, controller.deleteImageManege);

// STANDS

router.get("/:id_user/stand/:id?", controller.showStand);
router.post("/:id_user/addStand", controller.addStand);
router.post("/:id_user/stand/:id/update", /*imageProcessor.uploadImages, await imageProcessor.resizeImages,*/ controller.editStand);
router.post("/:id_user/stand/:id/delete", controller.deleteStand);
router.get("/:id_user/stand/:id/signup", controller.signupStand);
router.post("/:id_user/stand/:id/signupPost", controller.signupStandPOST);
//router.post("/:id_user/stand/:id/deleteImage", imageProcessor.deleteImage, controller.deleteImageStand);

// SCENE

router.get("/:id_user/artiste/:id?", controller.showArtists);








router.get("/:id_user/addArtists", controller.addArtists);
router.post("/:id_user/addArtists", controller.addArtistsPOST);
router.post("/:id_user/artistes/:id/update", imageProcessor.uploadImages, await imageProcessor.resizeImages, controller.editArtists);
router.post("/:id_user/artistes/:id/deleteImage", imageProcessor.deleteImage, controller.deleteImageArtists);
router.post("/:id_user/artistes/:id/delete", controller.deleteArtists);


// router.get("/:id_user/artistes/:id?", controller.showArtists);

export default router;