const mongoose = require('mongoose');
const { isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    pseudo: {
        type:String ,
        required:true,
        minlength:3,
        maxlength:55,
        unique:true,
        trim:true   //"  hello", ou "hello ", ou "  hello "  c'est-à-dire que les espaces blancs seront supprimés des deux côtés de la chaîne.
    },
    email:{
        type:String,
        require:true,
        validate:[isEmail],
        lowercase:true,// tout en minuscule
        trim:true , 
        unique : true
    },
    password:{
        type:String,
        require:true,
         max:1024,// vu que le mot de passe sera crypté donc une centaine de lettre et autre 
         minlength:6,
    },
   picture: {
      type: String,
      default: "./uploads/profil/random-user.png" // on mettra une photo par defaut 
    },
    bio :{
      type: String,
      max: 1024,
    },
    followers: { //les gens qui suivent la personne
      type: [String]// des id id id des suiveurs 
    },
    following: { //les gents que l'utilisateur suit  
      type: [String] 
    },
    likes: {
      type: [String]
    }

},
    //  le timestamps a la fin du tableau 
{
    timestamps: true, //Les schémas Mongoose prennent en charge une timestamps option. Si vous définissez timestamps: true, Mongoose ajoutera deux propriétés de type Dateà votre schéma :createdAt: une date représentant la date de création de ce document
                      // updatedAt: une date représentant la dernière mise à jour de ce document
  });

 // play function before save into display: 'block',
// avant la sauvegarde 
  userSchema.pre("save", async function(next) { //pre = avant de sauvegarder dans la base de donnée  et pas de fonction fleché sinon this ne fonction pas 
    const salt = await bcrypt.genSalt(); // bcrypt va generer des caracteres que l'on va ajouter au mot de passe 
    this.password = await bcrypt.hash(this.password, salt); // on va salé le mot de passe  et le hashé 
    next();
  });
  
  // on compare les mot de passe 
  userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
     throw Error('incorrect email')
  };


module.exports = mongoose.model('users.model',userSchema); 