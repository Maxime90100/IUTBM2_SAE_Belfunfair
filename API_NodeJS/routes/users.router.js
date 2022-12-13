import express from "express";
import * as user from "../controllers/users.controller.js";

const router = express.Router();

router.get("/");
router.post("/login",user.authenticateUser);
router.get("/logout", user.logout);

router.get("/typesManege",user.getTypesManege);
router.get("/typesStand",user.getTypesStand);
export default router;