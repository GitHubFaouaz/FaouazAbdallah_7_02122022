import express from "express";
import {
  deleteUser,
  //   followUser,
  getUser,
  //   UnFollowUser,
  updateUser,
  getAllUsers,
} from "../Controllers/UserController.js";
// import router from "express.router";
const router = express.Router();

// user display
router.get("/", getAllUsers); // accedé à tous les utilisateurs
router.get("/:id", getUser); // accedé à un seul les utilisateur
router.put("/:id", updateUser); // modification d'un utilisateur
router.delete("/:id", deleteUser); // suppresion d'un utilisateur

export default router;
