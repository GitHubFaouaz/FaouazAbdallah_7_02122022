

//je fais appele de mon models user dont jai besoin 
const UserModel = require('../models/users.model');
const jwt = require('jsonwebtoken');
const {signUpErrors ,  signInErrors } =require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => { //1er parametre le id  
  return jwt.sign({id}, process.env.TOKEN_SECRET, { // 2eme parametre la clé secret qui permet de decodé le token 
    expiresIn: maxAge // la periode de  validitée du token ici en milliseconde (24 * 60 * 60 * 1000 ) = 1journée donc le tout *  3 donc 3 jours 
  })
};


module.exports.signUp = async (req, res) => {
  // console.log(req.body )
  const {pseudo , email ,password} = req.body //req.body.pseudo ou email ou password 
  
  try{
    const user = await UserModel.create({pseudo, email, password});
    res.status(201).json({ user: user._id });

  }
  catch(err){
      const errors = signUpErrors(err); // on gere les erreures dans le dossier utils
      res.status(200).send({ errors })
      //  console.log(err.keyValue)// err pour le pseudo par exemple dans mongoose DB 
  }
}

module.exports.signIn = async (req, res) => {

  const {email ,password} = req.body 
  
  try{
    const user = await UserModel.login(email,password); 
    const token = createToken(user._id);//_id du db(data base = base de donnée) donc on met l'id de l'utilisateur dans le tken en le créant ainsi pou poura savoir qui il est 
    // apres creation du token tu me le met dans les cookies
    res.cookie('jwt', token, { httpOnly: true, maxAge });// 1er params est le nom du cookies , 2eme params le token 3 params la securité du cookies 4 params  le delais de validité
    res.status(200).json({ user: user._id})
  }
  catch(err){
      const errors = signInErrors(err) 
      res.status(401).send({ errors })
      //  console.log(err)
  }
}

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }); // maxAge: 1 milliseconde donc disparait  instantanement
  res.redirect('/');// on fait une redirection pour que la requette aboutie puisqu'il faut une reponse
}






















