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
router.post("/:id_user/manege/:id/cancelSignup", controller.cancelSignupManege);
//router.post("/:id_user/manege/:id/deleteImage", imageProcessor.deleteImage, controller.deleteImageManege);

// STANDS

router.get("/:id_user/stand/:id?", controller.showStand);
router.post("/:id_user/addStand", controller.addStand);
router.post("/:id_user/stand/:id/update", /*imageProcessor.uploadImages, await imageProcessor.resizeImages,*/ controller.editStand);
router.post("/:id_user/stand/:id/delete", controller.deleteStand);
router.get("/:id_user/stand/:id/signup", controller.signupStand);
router.post("/:id_user/stand/:id/signupPost", controller.signupStandPOST);
router.post("/:id_user/stand/:id/cancelSignup", controller.cancelSignupStand);
//router.post("/:id_user/stand/:id/deleteImage", imageProcessor.deleteImage, controller.deleteImageStand);

// SCENE

router.get("/:id_user/artiste/:id?", controller.showArtists);
router.post("/:id_user/addArtiste", controller.addArtist);
router.post("/:id_user/artiste/:id/update", /*imageProcessor.uploadImages, await imageProcessor.resizeImages,*/ controller.editArtist);
router.post("/:id_user/artiste/:id/delete", controller.deleteArtist);
router.get("/:id_user/artiste/:id/signup", controller.signupArtist);
router.post("/:id_user/artiste/:id/signupPost", controller.signupArtistPOST);
router.post("/:id_user/artiste/:id/cancelSignup", controller.cancelSignupArtist);

export default router;