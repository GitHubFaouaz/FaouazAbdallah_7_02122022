
// gerance des erreures de creation du compte
module.exports.signUpErrors = (err) => {  

let errors = { pseudo : '' , email:'' , password : ''}
// JE ne pense pas que les 2 premières conditions soit necessaire puisqu'il ya les 2 dernieres deja
 if (err.message.includes('pseudo')) // si l'erreur de message concerne le pseudo 
 errors.pseudo = "Pseudo incorrect ou déjà pris";

 if (err.message.includes('email'))
 errors.email = 'Email incorrect';

if (err.message.includes('password'))
errors.password= 'Le mot de pass doit faire 6 caractères minimum';

if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Ce pseudo est déjà pris";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà enregistré";

return errors 

};
//on cible ainsi  le pseudo avec le code 11000 qui est le meme pour email 
/*{
    "err": {
        "index": 0,
        "code": 11000,
        "keyPattern": {
            "pseudo": 1
        },
        "keyValue": {
            "pseudo": "Fatiiszzzz"
        }
    }
}

{
    "err": {
        "index": 0,
        "code": 11000,
        "keyPattern": {
            "email": 1
        },
        "keyValue": {
            "email": "codefaouaz@yahoo.com"
        }
    }
}*/

// gerance des erreures de connexions 

module.exports.signInErrors = (err) => {
    let errors = { email:'' , password : ''}

    if(err.message.includes("email")) 
    errors.email = "Email innconu";

    if(err.message.includes("password"))
    errors.password = " le mot de passe ne correspond pas ";

    return errors
} ;


