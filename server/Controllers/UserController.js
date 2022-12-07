import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt"; // pour le mot de passe
import jwt from "jsonwebtoken"; //token

/* const ObjectID = require('mongoose').Types.ObjectId;


module.exports.getAllUsers = (req,res) => {

      userModel.find().select('-password')  
      .then(users => res.status(200).json(users))// on envoi simplement le tableau des users de la base
      .catch(error => res.status(400).json({ error }));
};

exports.infoUser = (req, res, next) => {
    userModel.findOne({ _id: req.params.id }).select('-password')// sans le mot de passe 
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

module.exports.updateUser = async (req,res) => {
    if(!ObjectID.isValid(req.params.id)) // ObjectID.isValid va testé si req.params.id est connu dans la base de donné et si cest pas le cas on fait un return 
   return res.status(400).send('ID unknown : ' + req.params.id) 

   try {
        await userModel.findOneAndUpdate( // on trouve l'utilisateur  et on le met a jour 
           { _id: req.params.id}, 
           { $set: {
               bio:req.body.bio
             }
           }, //set insert met la bio ( qui sera en request).
            { new: true, upsert: true, setDefaultsOnInsert: true }, // a mettre obligatoirement  quand t'on fait un put  
           (err,docs) => {
                if(!err) return res.send(docs);// s'il ny a pas d'erreur envoi moi la data 
               if (err)return res.status(500).send({message: err});// else (err)return res.status(500).send({message: err});
             
            }
        )


    }catch (err) {
       return res.status(500).json({message: err});
      
    }

   

};

 
module.exports.deleteUser = (req, res) => {
    
    userModel.findOne({ _id: req.params.id })//_id de la sauce en vente (dans la base) : egale  a celui du  paramètre de la requête /api/stuff/:id 
        userModel.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'utilisateur supprimé'}))
        .catch(error => res.status(404).json({ error }));
};
*/
// Get all users
export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
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
    const user = await UserModel.findById(id); //on cherche le di dans la base de donné
    // UserModel = users du mongooseDb comme users.findById
    if (user) {
      // si le user existe
      const { password, ...otherDetails } = user._doc; // ._doc  cest tout les details concernant que l'on voit dans mogoose db le user
      // res.status(200).json(user);  ou res.status(200).json(user._doc);
      res.status(200).json(otherDetails); //Autres détails en français le nom nest pas obligé on nomme comme on veut
    } else {
      res.status(404).json("No such user exists"); //"Aucun utilisateur de ce type n'existe"
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a user mise a jour de user (concerne tout les informations modifiables)
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, password } = req.body; // _id= ID utilisateur actuel dans mongoose Db,  Statut actuel de l'administrateur de l'utilisateur =currentUserAdminStatus

  // if (id === _id ) {
  if (id === _id) {
    //si id(req.params.id de url ) = _id de mongooseDB  ou  currentUserAdminStatus (dans userModel (isAdmin = false) car il n'est pas ladministrateur) alors

    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt); // si le mot de passe envoié en front = au mot de passe hashé 10 alors trouve le user avec ses info qui seron affiché a lecran front
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      //on enregistre le nom et le id  avec le token
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWTKEY,
        { expiresIn: "1" }
      );
      res.status(200).json(user, token);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json(
        "Accès refusé! vous ne pouvez mettre à jour que votre propre profil"
      ); //Access Denied! you can only update your own profile
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { _id } = req.body; //donc _id= req.body._id, currentUserAdminStatus = req.body.currentUserAdminStatus

  if (_id === id) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("Utilisateur supprimé avec succès"); //User deleted successfully
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only delete your own profile");
  }
};

// // Follow a User
// export const followUser = async (req, res) => {
//   const id = req.params.id; //localhost:5000/user/635d53bf3ae21c00ecdfbea6/follow

//   const { _id } = req.body;

//   if (_id === id) {
//     // pour eviter que le user se followe lui meme
//     res.status(403).json("Action forbidden"); //Action interdite 403 Forbidden indique qu'un serveur comprend la requête mais refuse de l'autoriser
//   } else {
//     try {
//       const followUser = await UserModel.findById(id); // celui qui est suivi (son id est req.params.id puisque que tu es sur sa page et que tu vas le suivre )
//       const followingUser = await UserModel.findById(_id); // celui qui veut suivre on va chercher le _id du user actuel qui va suivre car il est dans base de donné

//       if (!followUser.followers.includes(_id)) {
//         //si le followUser que l'on veut suivre n'a pas dans son tableau celui quil veut le suivre (followUser)
//         await followUser.updateOne({ $push: { followers: _id } }); // si c'est le cas alors met le _id du suiveur dans le tableau des followers qu'il a suivit
//         await followingUser.updateOne({ $push: { following: id } }); // et met le _id de celui que est suivi dans le tableau des suivi(following:) de celui qui a suivi
//         res.status(200).json("Utilisateur suivi !"); // User followed!
//       } else {
//         res.status(403).json("L'utilisateur est déjà suivi par vous"); //User is Already followed by you
//       }
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   }
// };

// // UnFollow a User
// export const UnFollowUser = async (req, res) => {
//   const id = req.params.id;

//   const { _id } = req.body;

//   if (_id === id) {
//     res.status(403).json("Action forbidden");
//   } else {
//     try {
//       const followUser = await UserModel.findById(id);
//       const followingUser = await UserModel.findById(_id);

//       if (followUser.followers.includes(_id)) {
//         await followUser.updateOne({ $pull: { followers: _id } });
//         await followingUser.updateOne({ $pull: { following: id } });
//         res.status(200).json("Utilisateur non suivi!"); //User Unfollowed
//       } else {
//         res.status(403).json("L'utilisateur n'est pas suivi par vous"); //User is not followed by you
//       }
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   }
// };
