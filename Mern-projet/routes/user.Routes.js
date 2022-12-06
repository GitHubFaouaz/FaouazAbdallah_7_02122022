const router = require('express').Router(); //const express = require('express'); const router = express.Router();
const authController = require('../controllers/auth.controller');
const userControllers = require('../controllers/user.controllers'); 


// auth 
router.post("/register",authController.signUp);//'/api/user/register'.
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);// apres deconnexion de l'utilisayeur on lui retire le token qu'il avait generé pour s'autentifier afin de faire des requets donc a la prochaine connexion il devra generé un nouveau token  

// user display : 'block',
router.get('/', userControllers.getAllUsers); // accedé à tous les utilisateurs
router.get('/:id', userControllers.infoUser); // accedé à un seul les utilisateur
router.put("/:id",userControllers.updateUser);// modification d'un utilisateur
router.delete("/:id",userControllers.deleteUser);// suppresion d'un utilisateur
router.patch("/follow/:id",userControllers.follow);
router.patch("/unfollow/:id",userControllers.unfollow);




module.exports = router;