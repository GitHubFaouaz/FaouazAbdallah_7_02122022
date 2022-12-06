const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
      posterId: {   // id d ela personne qui post 
        type: String,
        required: true
      },
      message: {
        type: String,
        trim: true,//"  hello", ou "hello ", ou "  hello "  c'est-à-dire que les espaces blancs seront supprimés des deux côtés de la chaîne.
        maxlength: 500,
      },
      picture: {
        type: String,
      },
      video: {
        type: String,
      },
      likers: { //toutes les personnes qui ont liker ce post 
        type: [String],
        required: true,
      },
      comments: { // pour les commentaires ont fait un sous base de donnée
        type: [
          {
            commenterId:String,
            commenterPseudo: String,
            text: String,
            timestamp: Number,
          }
        ],
        required: true,// true pour que le tableau soit créé de base 
      },
    },
    {
      timestamps: true,// le post auusi aura un timestamps
    }
  );
  
  module.exports = mongoose.model('post.model', PostSchema);

  // on peut donné nimporte quel nom  a la base de donné ('post.model') pas obligé de mettre le meme nom que le fichier de model 
  // a noté que mongoose met toujours un S au nom de la base 