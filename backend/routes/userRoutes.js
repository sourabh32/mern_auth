import express from "express";
import { authUser,getUser,updateUser,logOutUser,regiterUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/",regiterUser)
router.post("/auth",authUser)
router.post("/logout",logOutUser)
router.route("/profile").get(protect,getUser).put(protect,updateUser)


export default router