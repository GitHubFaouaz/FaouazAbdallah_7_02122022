import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt"; // pour le mot de passe
import jwt from "jsonwebtoken"; //token
import { isValidObjectId } from "mongoose";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a User
export const getUser = async (req, res) => {
  // on trouve le id req.params.id
  const id = req.params.id; //req.params.id de la barre url

  try {
    // ObjectID.isValid verifie  si le id est connu de la base de donnée
    if (!isValidObjectId(id)) res.status(400).json("ID inconnu : " + id);
    else {
      // sinon on envoi les informations concernant le id
      const user = await UserModel.findById(id);
      res.status(200).json(user);
      // res.status(200).json(user);  ou res.status(200).json(user._doc) res.status(200).json(user._doc.pseudo) res.status(200).json(user.pseudo);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update user mise a jour du user (concerne toute les informations modifiables)
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, password } = req.body;

  if (isValidObjectId(id)) {
    try {
      // on va hasher le mot de passe
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      //  on trouve et on met a jour les informations concernant le user
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true, //Vous devez définir l' new option pour true renvoyer le document après avoir update été appliqué.
      });
      //on enregistre le pseudo et le id  avec le token
      const token = jwt.sign(
        { pseudo: user.pseudo, id: user._id },
        process.env.JWTKEY,
        { expiresIn: "1" }
      );
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json(
        "Accès refusé! vous ne pouvez mettre à jour que votre propre profil"
      );
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const paramsId = req.params.id;

  if (isValidObjectId(paramsId)) {
    try {
      await UserModel.findByIdAndDelete(paramsId);
      res.status(200).json("Utilisateur supprimé avec succès");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Accès refusé! vous ne pouvez supprimer le profil"); // '403': 'Forbidden', interdite
  }
};

// // Follow a User
export const followUser = async (req, res) => {
  const paramsId = req.params.id;
  const { _id } = req.body;
  // pour eviter que le user se followe lui meme
  if (_id === paramsId) {
    res.status(403).json("Action forbidden"); //Action interdite 403 Forbidden indique qu'un serveur comprend la requête mais refuse de l'autoriser  )
  } else {
    try {
      const followUser = await UserModel.findById(paramsId); // (req.params.id)
      const followingUser = await UserModel.findById(_id); // de la base de donnée
      // si dans le tableau des followers du user(req.params.id) le _id(que l'on veut suivre) n'est pas inclus
      if (!followUser.followers.includes(_id)) {
        //
        await followUser.updateOne({ $push: { followers: _id } }); // on met le _id dans le tableau du user(req.params.id)
        await followingUser.updateOne({ $push: { following: paramsId } }); // aussi on met le id(req.params.id) du user dans le tableau de celui qui est suivit
        res.status(200).json(`${followingUser.pseudo} est suivi`); // User followed!
      } else {
        res.status(403).json(`${followingUser.pseudo} est déjà suivi par vous`); //User is Already followed by you
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

// // UnFollow a User
export const UnFollowUser = async (req, res) => {
  const paramsId = req.params.id;

  const { _id } = req.body;

  if (_id === paramsId) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(paramsId);
      const followingUser = await UserModel.findById(_id);
      // si dans le tableau des followers du user(req.params.id) le _id(que l'on veut suivre) est  inclus
      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } });
        await followingUser.updateOne({ $pull: { following: paramsId } });
        res.status(200).json(`${followingUser.pseudo} n'est plus suivi!`);
      } else {
        res.status(403).json(`${followingUser.pseudo}n'est pas suivi par vous`);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
