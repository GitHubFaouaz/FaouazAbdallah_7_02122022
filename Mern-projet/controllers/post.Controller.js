const postModel = require("../models/post.model");
const UserModel = require('../models/users.model');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.readPost = (req, res) => { // lesture de la base de donné
  postModel.find((err, docs) => { //envoi moi le docs (la data) ou s'il ya erreur envoi
    if (!err) res.send(docs);
    else console.log('Error to get data : ' + err);
  }).sort({ createdAt: -1 });//.sort({createdAt: -1 }); permet d'afficher la liste du plus recent au plus ancien 
};

module.exports.creatPost = async (req, res) => {
  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });
  try {
    const post = await newPost.save(); // on enregistre 
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }

};

module.exports.updatePost = (req, res) => {

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  //  enregistrement de la mise a jour, Record = enregistrement  
  const updateRecord = {
    message: req.body.message
  }
  //trouve et met a jour le message de l'utilisateur 
  postModel.findByIdAndUpdate(
    req.params.id, // on doit avoir l'ID du post( objectID) c'est a dire du message qui va etre mit a jour  et non L'id de la personne 
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  )

};

module.exports.deletePost = (req, res) => {

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  postModel.findByIdAndRemove(
    req.params.id,// id du message que l'on souhaite supprimé
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);

    });
};

module.exports.likePost = async (req, res) => {

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await postModel.findByIdAndUpdate(
      req.params.id, //  id du post (post.model objectId) et non de l'utilisateur 
      { $addToSet: { likers: req.body.id } }, // on ajoute le id de l'utilisateur qui va liké au tableau des likers sans ecrasé le contenu du tableau 
      { new: true },
      /*(err, docs) => {
        if (err) return res.status(400).send(err);
      }*/

    )
      .then((docs) => res.send(docs)) // on ne peut avoir de res , on envoi la docs(data) une seul fois donc soit maintenant soit a la fin du try
      .catch((err) => res.status(500).send({ message: err }));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      /* (err, docs) => {
         if (!err) res.send(docs);
         else return res.status(400).send(err);
       }*/
    )
      .catch((err) => res.status(500).send({ message: err }));

  } catch (err) {
    return res.status(400).send(err);
  }

};

module.exports.unlikePost = async (req, res) => {

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);


  try {
    await postModel.findByIdAndUpdate(
      req.params.id, //  id du post (post.model objectId) et non de l'utilisateur 
      { $pull: { likers: req.body.id } }, // on retire le id de l'utilisateur qui va liké au tableau des likers sans ecrasé le contenu du tableau 
      { new: true },
      /*(err, docs) => {
        if (err) return res.status(400).send(err);
      }*/

    )
      .then((docs) => res.send(docs)) // on ne peut avoir de res , on envoi la docs(data) une seul fois donc soit maintenant soit a la fin du try
      .catch((err) => res.status(500).send({ message: err }));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      /* (err, docs) => {
         if (!err) res.send(docs);
         else return res.status(400).send(err);
       }*/
    )
      .catch((err) => res.status(500).send({ message: err }));

  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return postModel.findByIdAndUpdate(
      req.params.id,// id du post  dans postModel
      {
        $push: { // on push uniquement les commentaires dans le tableau
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),// en javascript qui sera converti en front
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }

};

module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return postModel.findById( //cherche par le id 
      req.params.id,
      (err, docs) => { //on reçoit la docs qu'on trouve avec le id ou l'erreur
        const theComment = docs.comments.find((comment) =>  //theComment coorespond au objet object(0) object(1) object(2) dans le tableau comments  
          comment._id.equals(req.body.commentId) //chaque commentaire a un id crée par mongooseBd donc on recupere le id du commentaire
        )

        if (!theComment) return res.status(404).senf('comment not found')
        theComment.text = req.body.text //le text commentaire du front end = a  comments.object.text de mongooseDB

        return docs.save((err) => {
          if (!err) return res.status(200).send(docs);
          return res.status(500).send(err);
        })
      })


  } catch (err) {
    return res.status(400).send(err);
  }


};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  // on fait un delete d'un commentaire qui est dans le post et non le post lui meme

  try {

    return postModel.findByIdAndUpdate(
      req.params.id, //on point le id du post que l'on veut commenté 
      {
        $pull: { //on cible le id du commentaire qui est dans le post pour le supprimer
          comments: { // on retire le commentaire qui a le ID suivant 
            _id: req.body.commentId, // attention commentId est le id du commentaire (texte) et commenterId et le id de celui quia commenté

          }
        }
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.status(202).send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }

};

