import express from "express";
import bodyParser from "body-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT;
export const app = express();

import * as controllerPublic from "./controllers/public.controller.js"
import {default as UsersRouter} from "./routes/users.router.js";
import {default as PrestatairesRouter} from "./routes/prestataires.router.js";
import {default as OrganisateursRouter} from "./routes/organisateurs.router.js";
import setSocialAuth, {default as GoogleRouter} from "./middlewares/setSocialAuth.js";
import {validateToken} from "./middlewares/authentication.js";

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        info: {
            title: "Belfunfair project",
            description: "API documentation",
            contact: {
                name: "SAE",
            },
            servers: ["http://localhost:3000/"],
        },
    }),
    apis: ["server.js", "./routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(cors({
    origin:'*',
    credentials: true,
    exposedHeaders: ['set-cookie']
}))

app.use("/users", UsersRouter);
app.use("/prestataires", validateToken, PrestatairesRouter);
app.use("/organisateurs", validateToken, OrganisateursRouter);
app.get("/",controllerPublic.Home);
/**
 * @swagger
 * /:
 *   get:
 *      description: Used to get all Manèges, Stands and Groups of Artist
 *      tags:
 *          - users
 *      responses:
 *          '200':
 *              description: Resource successfully fetch
 *          '400':
 *              description: Bad request
 */

setSocialAuth()
app.listen(port, ()=>{
    console.log(`Le serveur écoute sur le port ${port}...`)
});



