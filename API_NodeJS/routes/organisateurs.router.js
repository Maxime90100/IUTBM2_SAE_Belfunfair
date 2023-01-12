import express from "express";
import * as controller from "../controllers/organisateurs.controller.js";
const router = express.Router();

router.get("/attractions/cancelSignup",controller.getCancelSignup)
/**
 * @swagger
 * /organisateurs/attractions/cancelSignup:
 *   get:
 *      description: Used to get all attractions want to cancel signup
 *      tags:
 *          - organisateurs
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.get("/attractions/waitAttribution",controller.getWaitAttribution)
/**
 * @swagger
 * /organisateurs/attractions/waitAttribution:
 *   get:
 *      description: Used to get all attractions want to be registered
 *      tags:
 *          - organisateurs
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */

router.post("/manege/:id_manege/:id_manifestation/cancel/:id_emplacement",controller.cancelSignupManege)
/**
 * @swagger
 * /organisateurs/manege/{id_manege}/{id_manifestation}/cancel/{id_emplacement}:
 *   post:
 *      description: Used to cancel registration of Manege
 *      tags:
 *          - organisateurs/maneges
 *      parameters:
 *          - in: path
 *            name: id_manege
 *            type: integer
 *            required: true
 *            description: id of manege
 *          - in: path
 *            name: id_manifestation
 *            type: integer
 *            required: true
 *            description: id of the manifestation
 *          - in: path
 *            name: id_emplacement
 *            type: integer
 *            description: id of emplacement
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/manege/:id_manege/:id_manifestation/register/:id_emplacement", controller.registerManege)
/**
 * @swagger
 * /organisateurs/manege/{id_manege}/{id_manifestation}/register/{id_emplacement}:
 *   post:
 *      description: Used to register Manege
 *      tags:
 *          - organisateurs/maneges
 *      parameters:
 *          - in: path
 *            name: id_manege
 *            type: integer
 *            required: true
 *            description: id of manege
 *          - in: path
 *            name: id_manifestation
 *            type: integer
 *            required: true
 *            description: id of the manifestation
 *          - in: path
 *            name: id_emplacement
 *            type: integer
 *            description: id of emplacement
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */

router.post("/stand/:id_stand/:id_manifestation/cancel/:id_emplacement",controller.cancelSignupStand)
/**
 * @swagger
 * /organisateurs/stand/{id_stand}/{id_manifestation}/cancel/{id_emplacement}:
 *   post:
 *      description: Used to cancel registration of Stand
 *      tags:
 *          - organisateurs/stands
 *      parameters:
 *          - in: path
 *            name: id_stand
 *            type: integer
 *            required: true
 *            description: id of stand
 *          - in: path
 *            name: id_manifestation
 *            type: integer
 *            required: true
 *            description: id of the manifestation
 *          - in: path
 *            name: id_emplacement
 *            type: integer
 *            description: id of emplacement
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/stand/:id_stand/:id_manifestation/register/:id_emplacement",controller.registerStand)
/**
 * @swagger
 * /organisateurs/stand/{id_stand}/{id_manifestation}/register/{id_emplacement}:
 *   post:
 *      description: Used to register Stand
 *      tags:
 *          - organisateurs/stands
 *      parameters:
 *          - in: path
 *            name: id_stand
 *            type: integer
 *            required: true
 *            description: id of stand
 *          - in: path
 *            name: id_manifestation
 *            type: integer
 *            required: true
 *            description: id of the manifestation
 *          - in: path
 *            name: id_emplacement
 *            type: integer
 *            description: id of emplacement
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */

router.post("/manege/:id_manege/:id_manifestation/cancel/:date",controller.cancelSignupArtiste)
/**
 * @swagger
 * /organisateurs/artiste/{id_artiste}/{id_manifestation}/cancel/{date}:
 *   post:
 *      description: Used to cancel registration of Artists' Group
 *      tags:
 *          - organisateurs/artists
 *      parameters:
 *          - in: path
 *            name: id_artiste
 *            type: integer
 *            required: true
 *            description: id of artiste
 *          - in: path
 *            name: id_manifestation
 *            type: integer
 *            required: true
 *            description: id of the manifestation
 *          - in: path
 *            name: date
 *            type: string
 *            "format": "dd/MM/yyyy"
 *            description: date of registration
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/manege/:id_manege/:id_manifestation/register/:date",controller.registerArtiste)
/**
 * @swagger
 * /organisateurs/artiste/{id_artiste}/{id_manifestation}/register/{date}:
 *   post:
 *      description: Used to register Artists' Group
 *      tags:
 *          - organisateurs/artists
 *      parameters:
 *          - in: path
 *            name: id_artiste
 *            type: integer
 *            required: true
 *            description: id of artiste
 *          - in: path
 *            name: id_manifestation
 *            type: integer
 *            required: true
 *            description: id of the manifestation
 *          - in: path
 *            name: date
 *            type: string
 *            "format": "dd/MM/yyyy"
 *            description: date of registration
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
export default router;
