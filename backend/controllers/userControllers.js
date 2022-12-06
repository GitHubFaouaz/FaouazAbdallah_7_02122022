const userModel = require('../Models/userModel');
 const ObjectID = require('mongoose').Types.ObjectId;


module.exports.getAllUsers = (req,res) => {

      userModel.find().select('-password')  
      .then(users => res.status(200).json(users))// on envoi simplement le tableau des users de la base
      .catch(error => res.status(400).json({ error }));
};

exports.infoUser = (req, res, next) => {
    userModel.findOne({ _id: req.params.id }).select('-password')//_id de la sauce en vente (dans la base) : egale  a celui du  paramètre de la requête /api/stuff/:id 
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
               //  console.log( " le 1 "  + err)
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
