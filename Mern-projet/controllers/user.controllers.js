const UserModel = require('../models/users.model');
const ObjectID = require('mongoose').Types.ObjectId;// permet de verifier que le parametre qui est present existe dans la base de donné

module.exports.getAllUsers = async (req,res) => {

    const users = await UserModel.find().select('-password'); // il va chercher et selectioné tous les users et les enformation leurs concernant exepté le password  ,  
    res.status(200).json({users});
};

 module.exports.infoUser = (req,res) => {
    console.log(req.params)
     console.log(req.body)
    
    if(!ObjectID.isValid(req.params.id)) // ObjectID.isValid va testé si req.params.id est connu dans la base de donné et si cest pas le cas on fait un return 
    return res.status(400).send('ID unknown : ' + req.params.id) 

     // Et si le if ne ne fait un return cets a dire que le id est bon 
    UserModel.findById(req.params.id, (err, docs) => {
    if(!err)res.send(docs); //s'il ny a pas derreur envoi docs ( la data)
    else console.log('ID unknown : ' + err);
 }).select('-password');

};

 module.exports.updateUser = async (req,res) => {
     if(!ObjectID.isValid(req.params.id)) // ObjectID.isValid va testé si req.params.id est connu dans la base de donné et si cest pas le cas on fait un return 
    return res.status(400).send('ID unknown : ' + req.params.id) 

    try {
         await UserModel.findOneAndUpdate( // on trouve l'utilisateur  et on le met a jour 
            { _id: req.params.id}, 
            { $set: {
                bio:req.body.bio
              }
            }, //set insert met la bio ( qui sera en request).
             { new: true, upsert: true, setDefaultsOnInsert: true }, // a mettre obligatoirement  quand t'on fait un put  
              /* (err,docs) => {
                 if(!err) return res.send(docs);// s'il ny a pas d'erreur envoi moi la data 
                 if (err)return res.status(500).send({message: err ,});// else (err)return res.status(500).send({message: err});
                   console.log( " le 1 "  + err)
            */  
             )
           // j'utilise then et catch a la place des if a cause de la version mongoose}
            .then((docs) => res.send(docs))
            .catch((err) => res.status(500).send({ message: err }));
           
    }catch (err) {
       return res.status(500).json({message: err});
         // console.log(err)
     }

    

};

 module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    try {
      await UserModel.remove({ _id: req.params.id }).exec();//exec() = execute
      res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
       return res.status(500).json({ message: err });
    

    }
};

module.exports.follow = async(req,res) => {
  if (!ObjectID.isValid(req.params.id)  || !ObjectID.isValid(req.body.idToFollow)) // donc le id de l'utilisateur et de celui (id dans la base de donnée) que l'on suit  doivent etre reconnu afin ne pas recevoir nimporte qui dans les followers ou following 
  return res.status(400).send("ID unknown : " + req.params.id);
  
  try {
    // add to the follower list
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
     /* (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).jsos(err);
      }*/
    )

     // j'utilise then et catch a la place des if a cause de la version mongoose}
     .then((docs) => res.send(docs))
     .catch((err) => res.status(500).send({ message: err }));
    
     // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true },
     /* (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }*/
    )

      // j'utilise then et catch a la place des if a cause de la version mongoose}
      // .then((docs) => res.send(docs))ON NE PEUT  VOIR 2 THEN  CELUI LA ET CELUI AU DESSUS  , de plus le code va planté  
      .catch((err) => res.status(500).send({ message: err }));
  } 
  
  catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.unfollow = async(req,res) => { //unfollow = ne plus suivre 
  if (!ObjectID.isValid(req.params.id)  || !ObjectID.isValid(req.body.idToUnFollow))
  return res.status(400).send("ID unknown : " + req.params.id);

  try {

     
     await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnFollow } }, // on retire avec pull id a ne plus uisvre
      { new: true, upsert: true },
     /* (err, docs) => {
        if (!err) res.status(201).json(docs);
        else return res.status(400).jsos(err);
      }*/
    )

     // j'utilise then et catch a la place des if a cause de la version mongoose}
     .then((docs) => res.status(200).send(docs))
     .catch((err) => res.status(500).send({ message: err }));
    
     // add to following list
    await UserModel.findByIdAndUpdate(
      req.body.idToUnFollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true },
     /* (err, docs) => {
        // if (!err) res.status(201).json(docs);
        if (err) return res.status(400).jsos(err);
      }*/
    )

      // j'utilise then et catch a la place des if a cause de la version mongoose}
      // .then((docs) => res.send(docs))ON NE PEUT  VOIR 2 THEN  CELUI LA ET CELUI AU DESSUS  , de plus le code va planté  
      .catch((err) => res.status(500).send({ message: err }));
  } 
   
   catch (err) {
    return res.status(500).json({ message: err });
  }
  
};