import express from "express";
import * as user from "../controllers/users.controller.js";

const router = express.Router();

router.get("/");

router.post("/login",user.authenticateUser);
/**
 * @swagger
 * /users/login:
 *   post:
 *      description: Used to login
 *      tags:
 *          - users
 *      parameters:
 *          - in: formData
 *            name: firstname
 *            type: string
 *            description: firstname of user account
 *            required: true
 *          - in: formData
 *            name: surname
 *            type: string
 *            description: surname of user account
 *            required: true
 *          - in: formData
 *            name: password
 *            type: string
 *            description: password of user account
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/signup",user.signup);
/**
 * @swagger
 * /users/signup:
 *   post:
 *      description: Used to signup
 *      tags:
 *          - users
 *      parameters:
 *          - in: formData
 *            name: firstname
 *            type: string
 *            description: firstname for new account
 *            required: true
 *          - in: formData
 *            name: surname
 *            type: string
 *            description: surname for new account
 *            required: true
 *          - in: formData
 *            name: password
 *            type: string
 *            description: password for new account
 *            required: true
 *          - in: formData
 *            name: email
 *            type: string
 *            description: email for new account
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.get("/logout", user.logout);

router.get("/typesManege",user.getTypesManege);
/**
 * @swagger
 * /users/typesManege:
 *   get:
 *      description: Used to get all types of Manèges
 *      tags:
 *          - users
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.get("/typesStand",user.getTypesStand);
/**
 * @swagger
 * /users/typesStand:
 *   get:
 *      description: Used to get all types of Stands
 *      tags:
 *          - users
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.get("/typesArtiste",user.getTypesArtist);
/**
 * @swagger
 * /users/typesArtiste:
 *   get:
 *      description: Used to get all types of Artiste
 *      tags:
 *          - users
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */

router.get("/attractions",user.getAttractions);
/**
 * @swagger
 * /users/attractions:
 *   get:
 *      description: Used to get all informations of Manèges, Stands and Artists
 *      tags:
 *          - users
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */

router.get("/manifestation",user.getManifestation);
/**
 * @swagger
 * /users/manifestation:
 *   get:
 *      description: Used to get actual manifestation
 *      tags:
 *          - users
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */

router.get("/notes/:id_user?",user.getNotes)
/**
 * @swagger
 * /users/notes:
 *   get:
 *      description: Used to get all notes
 *      tags:
 *          - users
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
/**
 * @swagger
 * /users/notes/{id_user}:
 *   get:
 *      description: Used to get all notes
 *      tags:
 *          - users
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            description: id of user's notes
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
router.post("/note/:id_user/:type/:id/:note",user.setNote);
/**
 * @swagger
 * /users/{id_user}/{type}/{id}/{note}:
 *   post:
 *      description: Used to note an attraction
 *      tags:
 *          - users
 *      parameters:
 *          - in: path
 *            name: id_user
 *            type: integer
 *            description: id of user
 *            required: true
 *          - in: path
 *            name: type
 *            type: string
 *            description: type of attraction (manege,stand or artiste)
 *            required: true
 *          - in: path
 *            name: id
 *            type: integer
 *            description: id of attraction
 *            required: true
 *          - in: path
 *            name: note
 *            type: number
 *            description: 0 < note < 5
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */
export default router;