const UserModel = require('../models/users.model');
const fs = require('fs') // pour incrementé des elements dans le fichier 
const {promisify}  = require('util');
const pipeline = promisify(require('stream').pipeline);// permet de creer le fichier dans lequel on enregiste le filename
const { uploadErrors } = require("../utils/errors.utils");


module.exports.uploadProfil = async (req, res ) => {
try {
    //1er verification le format
    if(
       req.file.detectedMimeType != 'image/jpg'  && 
       req.file.detectedMimeType != 'image/jpeg' && 
       req.file.detectedMimeType != 'image/png'   
     )

    throw Error ("invalid file"); //on envoi l'erreur 
    // 2eme verification la taille 
   if(req.file.size > 500000) //s'il est superieur a 500000ko tu le throw enfet le throw envoi direct au catch 
    throw Error ('max size ');
  }catch (err) {
    const errors = uploadErrors(err)
    return res.status(401).json(errors);
  }

  

// N'importe quel format envoyé par le front sera trensformé en jpg ,chaque nouvelle photo viendra ecrassé l'ancienne photo 
 const fileName = req.body.name + ".jpg";// ne fonction pas avec  req.body.pseudo , le name doit etre le meme pour que l'image precedente soit ecrasé par la nouvelle 
 
 await pipeline(
    req.file.stream,
    fs.createWriteStream( // on lui donne le chemin où stoké l'image
      `${__dirname}/../client/public/uploads/profil/${fileName}`// il faudra passé ce chemin là a mongooseDB 
    )
    
  );
 
   try {
    await UserModel.findByIdAndUpdate (
    req.body.userId, //id de l'utilisateur (_id :objectId("62a60502611d60dc470aab57"))
    {$set : {picture: "/uploads/profil/" + fileName }},//mettre dans le chemin indiqué comme comme dans le users.model 
    { new: true, upsert: true, setDefaultsOnInsert: true},
   /* (err,docs) => {
      if (!err) return res.send(docs);
      else return res.status(500).send({message: err }); 
    }*/
)
        // j'utilise then et catch a la place des if a cause de la version mongoose}
        .then((docs) => res.send(docs))
        .catch((err) => res.status(500).send({ message: err }));
       
 

   }catch(err) {

    return res.status(500).send({message : err });
   }
   
   
};

