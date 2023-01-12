import express from "express";
import * as controller from "../controllers/prestataires.controller.js";
import * as imageProcessor from "../middlewares/imagesProcessor.js";
const router = express.Router();

// MANEGES

router.get("/:id_user/manege/:id?", controller.showManeges);
/**
 * @swagger
 * /prestataires/{id_user}/manege/{id}:
 *   get:
 *      description: Used to get Manège with id
 *      tags:
 *          - prestataires/maneges
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            required: true
 *            description: id of the user
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: id of the manège
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
/**
 * @swagger
 * /prestataires/{id_user}/manege:
 *   get:
 *      description: Used to get All Manèges
 *      tags:
 *          - prestataires/maneges
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            required: true
 *            description: id of the user
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/:id_user/addManege", controller.addManege);
/**
 * @swagger
 * /prestataires/{id_user}/addManege:
 *   post:
 *      description: Used to add Manège
 *      tags:
 *          - prestataires/maneges
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            description: id of user
 *            required: true
 *          - in: formData
 *            name: name
 *            type: string
 *            description: name of Manège
 *            required: true
 *          - in: formData
 *            name: description
 *            type: string
 *            description: description of Manège
 *            required: true
 *          - in: formData
 *            name: type
 *            type: integer
 *            description: id of type of Manège
 *            required: true
 *          - in: formData
 *            name: taille_min
 *            type: integer
 *            description: minimal size for enter in Manège
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/:id_user/manege/:id/update", /*imageProcessor.uploadImages, await imageProcessor.resizeImages,*/ controller.editManege);
/**
 * @swagger
 * /prestataires/{id_user}/manege/{id}/update:
 *   post:
 *      description: Used to update Manège
 *      tags:
 *          - prestataires/maneges
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            description: id of user
 *            required: true
 *          - in: path
 *            name: id
 *            type: integer
 *            description: id of Manège
 *            required: true
 *          - in: formData
 *            name: name
 *            type: string
 *            description: name of Manège
 *            required: true
 *          - in: formData
 *            name: description
 *            type: string
 *            description: description of Manège
 *            required: true
 *          - in: formData
 *            name: type
 *            type: integer
 *            description: id of type of Manège
 *            required: true
 *          - in: formData
 *            name: taille_min
 *            type: integer
 *            description: minimal size for enter in Manège
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/:id_user/manege/:id/delete", controller.deleteManege);
/**
 * @swagger
 * /prestataires/{id_user}/manege/{id}/delete:
 *   post:
 *      description: Used to delete Manège
 *      tags:
 *          - prestataires/maneges
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            description: id of user
 *            required: true
 *          - in: path
 *            name: id
 *            type: integer
 *            description: id of Manège
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.get("/:id_user/manege/:id/signup", controller.signupManege);
/**
 * @swagger
 * /prestataires/{id_user}/manege/{id}/signup:
 *   get:
 *      description: Used to get current manège and others manèges registered
 *      tags:
 *          - prestataires/maneges
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            required: true
 *            description: id of the user
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: id of the manège
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/:id_user/manege/:id/signupPost", controller.signupManegePOST);
/**
 * @swagger
 * /prestataires/{id_user}/manege/{id}/signupPost:
 *   post:
 *      description: Used to register Manège on emplacement in manifestation
 *      tags:
 *          - prestataires/maneges
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            required: true
 *            description: id of the user
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: id of the manège
 *          - in: formData
 *            name: id_emplacement
 *            type: integer
 *            description: id of emplacement to register Manège
 *            required: true
 *          - in: formData
 *            name: id_manifestation
 *            type: integer
 *            description: id of manifestation to register Manège
 *            required: true
 *          - in: formData
 *            name: datedebut
 *            type: string
 *            description: start date of registration
 *            required: true
 *          - in: formData
 *            name: datefin
 *            type: string
 *            description: end date of registration
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/:id_user/manege/:id/cancelSignup", controller.cancelSignupManege);
/**
 * @swagger
 * /prestataires/{id_user}/manege/{id}/cancelSignup:
 *   post:
 *      description: Used to cancel registration of Manège
 *      tags:
 *          - prestataires/maneges
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            required: true
 *            description: id of the user
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: id of the manège
 *          - in: formData
 *            name: id_manifestation
 *            type: integer
 *            description: id of manifestation to register Manège
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
//router.post("/:id_user/manege/:id/deleteImage", imageProcessor.deleteImage, controller.deleteImageManege);

// STANDS

router.get("/:id_user/stand/:id?", controller.showStand);
/**
 * @swagger
 * /prestataires/{id_user}/stand/{id}:
 *   get:
 *      description: Used to get Stand with id
 *      tags:
 *          - prestataires/stands
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            required: true
 *            description: id of the user
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: id of the stand
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
/**
 * @swagger
 * /prestataires/{id_user}/stand:
 *   get:
 *      description: Used to get All Stands
 *      tags:
 *          - prestataires/stands
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            required: true
 *            description: id of the user
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/:id_user/addStand", controller.addStand);
/**
 * @swagger
 * /prestataires/{id_user}/addStand:
 *   post:
 *      description: Used to add Stand
 *      tags:
 *          - prestataires/stands
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            description: id of user
 *            required: true
 *          - in: formData
 *            name: name
 *            type: string
 *            description: name of Stand
 *            required: true
 *          - in: formData
 *            name: description
 *            type: string
 *            description: description of Stand
 *            required: true
 *          - in: formData
 *            name: type
 *            type: integer
 *            description: id of type of Stand
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/:id_user/stand/:id/update", /*imageProcessor.uploadImages, await imageProcessor.resizeImages,*/ controller.editStand);
/**
 * @swagger
 * /prestataires/{id_user}/stand/{id}/update:
 *   post:
 *      description: Used to update Stand
 *      tags:
 *          - prestataires/stands
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            description: id of user
 *            required: true
 *          - in: path
 *            name: id
 *            type: integer
 *            description: id of Stand
 *            required: true
 *          - in: formData
 *            name: name
 *            type: string
 *            description: name of Stand
 *            required: true
 *          - in: formData
 *            name: description
 *            type: string
 *            description: description of Stand
 *            required: true
 *          - in: formData
 *            name: type
 *            type: integer
 *            description: id of type of Stand
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/:id_user/stand/:id/delete", controller.deleteStand);
/**
 * @swagger
 * /prestataires/{id_user}/stand/{id}/delete:
 *   post:
 *      description: Used to delete Stand
 *      tags:
 *          - prestataires/stands
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            description: id of user
 *            required: true
 *          - in: path
 *            name: id
 *            type: integer
 *            description: id of Stand
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.get("/:id_user/stand/:id/signup", controller.signupStand);
/**
 * @swagger
 * /prestataires/{id_user}/stand/{id}/signup:
 *   get:
 *      description: Used to get current stand and others stands registered
 *      tags:
 *          - prestataires/stands
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            required: true
 *            description: id of the user
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: id of the Stand
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/:id_user/stand/:id/signupPost", controller.signupStandPOST);
/**
 * @swagger
 * /prestataires/{id_user}/stand/{id}/signupPost:
 *   post:
 *      description: Used to register stand on emplacement in manifestation
 *      tags:
 *          - prestataires/stands
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            required: true
 *            description: id of the user
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: id of the Stand
 *          - in: formData
 *            name: id_emplacement
 *            type: integer
 *            description: id of emplacement to register Stand
 *            required: true
 *          - in: formData
 *            name: id_manifestation
 *            type: integer
 *            description: id of manifestation to register Stand
 *            required: true
 *          - in: formData
 *            name: datedebut
 *            type: string
 *            description: start date of registration
 *            required: true
 *          - in: formData
 *            name: datefin
 *            type: string
 *            description: end date of registration
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/:id_user/stand/:id/cancelSignup", controller.cancelSignupStand);
/**
 * @swagger
 * /prestataires/{id_user}/stand/{id}/cancelSignup:
 *   post:
 *      description: Used to cancel registration of Stand
 *      tags:
 *          - prestataires/stands
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            required: true
 *            description: id of the user
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: id of the Stand
 *          - in: formData
 *            name: id_manifestation
 *            type: integer
 *            description: id of manifestation to register Stand
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
//router.post("/:id_user/stand/:id/deleteImage", imageProcessor.deleteImage, controller.deleteImageStand);

// SCENE

router.get("/:id_user/artiste/:id?", controller.showArtists);
/**
 * @swagger
 * /prestataires/{id_user}/artiste/{id}:
 *   get:
 *      description: Used to get Group with id
 *      tags:
 *          - prestataires/artists
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            required: true
 *            description: id of the user
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: id of the Group
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
/**
 * @swagger
 * /prestataires/{id_user}/artiste:
 *   get:
 *      description: Used to get All Groups
 *      tags:
 *          - prestataires/artists
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            required: true
 *            description: id of the user
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/:id_user/addArtiste", controller.addArtist);
/**
 * @swagger
 * /prestataires/{id_user}/addArtiste:
 *   post:
 *      description: Used to add Group
 *      tags:
 *          - prestataires/artists
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            description: id of user
 *            required: true
 *          - in: formData
 *            name: name
 *            type: string
 *            description: name of Group
 *            required: true
 *          - in: formData
 *            name: description
 *            type: string
 *            description: description of Group
 *            required: true
 *          - in: formData
 *            name: type
 *            type: integer
 *            description: id of type of Group
 *            required: true
 *          - in: formData
 *            name: groupe
 *            type: string
 *            description: name of member of Group (separate by ',')
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/:id_user/artiste/:id/update", /*imageProcessor.uploadImages, await imageProcessor.resizeImages,*/ controller.editArtist);
/**
 * @swagger
 * /prestataires/{id_user}/artiste/{id}/update:
 *   post:
 *      description: Used to update Group
 *      tags:
 *          - prestataires/artists
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            description: id of user
 *            required: true
 *          - in: path
 *            name: id
 *            type: integer
 *            description: id of Group
 *            required: true
 *          - in: formData
 *            name: name
 *            type: string
 *            description: name of Group
 *            required: true
 *          - in: formData
 *            name: description
 *            type: string
 *            description: description of Group
 *            required: true
 *          - in: formData
 *            name: type
 *            type: integer
 *            description: id of type of Group
 *            required: true
 *          - in: formData
 *            name: groupe
 *            type: string
 *            description: name of member of Group (separate by ',')
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/:id_user/artiste/:id/delete", controller.deleteArtist);
/**
 * @swagger
 * /prestataires/{id_user}/artiste/{id}/delete:
 *   post:
 *      description: Used to delete Group
 *      tags:
 *          - prestataires/artists
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            description: id of user
 *            required: true
 *          - in: path
 *            name: id
 *            type: integer
 *            description: id of Group
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.get("/:id_user/artiste/:id/signup", controller.signupArtist);
/**
 * @swagger
 * /prestataires/{id_user}/artiste/{id}/signup:
 *   get:
 *      description: Used to get current group and others groups registered on planning
 *      tags:
 *          - prestataires/artists
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            required: true
 *            description: id of the user
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: id of the Group
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/:id_user/artiste/:id/signupPost", controller.signupArtistPOST);
/**
 * @swagger
 * /prestataires/{id_user}/artiste/{id}/signupPost:
 *   post:
 *      description: Used to register group on planning in manifestation
 *      tags:
 *          - prestataires/artists
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            required: true
 *            description: id of the user
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: id of the Group
 *          - in: formData
 *            name: id_manifestation
 *            type: integer
 *            description: id of manifestation to register Group
 *            required: true
 *          - in: formData
 *            name: date
 *            type: string
 *            description: date of registration
 *            required: true
 *          - in: formData
 *            name: startHour
 *            type: string
 *            description: start Hour of registration
 *            required: true
 *          - in: formData
 *            name: endHour
 *            type: string
 *            description: end Hour of registration
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/:id_user/artiste/:id/cancelSignup", controller.cancelSignupArtist);
/**
 * @swagger
 * /prestataires/{id_user}/artiste/{id}/cancelSignup:
 *   post:
 *      description: Used to cancel registration of Group
 *      tags:
 *          - prestataires/artists
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            required: true
 *            description: id of the user
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *            description: id of the Group
 *          - in: formData
 *            name: id_manifestation
 *            type: integer
 *            description: id of manifestation to register Group
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */

export default router;