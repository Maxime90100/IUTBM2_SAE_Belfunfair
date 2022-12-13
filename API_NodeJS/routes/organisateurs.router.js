import express from "express";
import * as controller from "../controllers/organisateurs.controller.js";
const router = express.Router();

// MANEGES ET STANDS

router.get("/:id_user/manegeStand", controller.showManegeStand);
router.get("/:id_user/manege/:id", controller.showManege);
router.get("/:id_user/stand/:id", controller.showStand);

// SECURITE

router.get("/:id_user/staff/:id?", controller.showStaff);

export default router;
