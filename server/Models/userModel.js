import mongoose from "mongoose";
// import isEmail from "validator";

const userSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      // validate: [isEmail],
      lowercase: true,
      trim: true, //"  hello", ou "hello ", ou "  hello ",
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePicture: {
      type: String,
      default: "./public/images/defaultProfil.png",
    },
    coverPicture: {
      type: String,
      default: "./public/images/defaultCover.jpg",
    },
    about: String, //bio
    livesin: String, // lives in  ....
    worksAt: String, // travaille a ....
    country: String, // pays...
    followers: [],
    following: [],
  },

  //  le timestamps a la fin du tableau
  {
    timestamps: true, //Les schémas Mongoose prennent en charge une timestamps option. Si vous définissez timestamps: true, Mongoose ajoutera deux propriétés de type Data votre schéma :
    //createdAt: une date représentant la date de création de ce document
    // updatedAt: une date représentant la dernière mise à jour de ce document
  }
);
const UserModel = mongoose.model("Users", userSchema);
export default UserModel;
