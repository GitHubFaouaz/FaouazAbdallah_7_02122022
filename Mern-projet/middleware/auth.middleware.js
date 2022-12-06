const jwt = require ('jsonwebtoken');
const UserModel = require('../models/users.model');

//on verifie si l'utilisateur est toujours connecté donc on check sont token 

module.exports.checkUser = (req,res,next) => {
const token = req.cookies.jwt // on accede au cookies  pour pouvoir lire le token  generé par l'utilisateur 
if (token) { // s'il ya un token appellé jwt on le verifie 
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => { // on verifie le token trouvé en passant le code secret qui autorise a decodé le token ainsi que le id a l'interieur
      if (err) { //si erreur
        res.locals.user = null;//les locals sont comme des parametre que l'ona provisoirement 
        res.cookie("jwt", "", { maxAge: 1 });// on enlève le token qu'a l'utilisateur car il n'est pas valide ici 1 = 1 milliseconde donc il disparaitraitre directement 
        next();
      } else {// si pas d'erreur 
        
        let user = await UserModel.findById(decodedToken.id);// on va decodé le token avec le id a l'interieur 
        res.locals.user = user;
        console.log('user' + user );
       
        next();
      }
    });
  } else { // s'il ya pas de token 
    res.locals.user = null;
    next();
  }
};

// on verifie si le id du token correspond a quelqu'un qui deja dans la base de donnée

module.exports.requireAuth = (req,res,next ) => {
    const token = req.cookies.jwt

    if (token) { // s'il ya un token appellé jwt on le verifie 
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => { // on verifie le token trouvé en passant le code secret qui autorise a decodé le token ainsi que le id a l'interieur
          if (err) { //si erreur pour l'autentification (le ID du token )
            console.log(err);
            res.send(401).json('no token')
          } else {
            console.log(decodedToken.id);
            next();
          }
        });
      } else { // si on ne trouve rpas de token 
        console.log('No token'); 
      }
       



};