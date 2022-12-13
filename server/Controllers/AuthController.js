import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//------------------------------------------- Registering a new User
export const registerUser = async (req, res) => {
  // on va hasher le mots de passe avec bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;

  const newUser = new UserModel({ ...req.body });
  // const newUser = new UserModel(req.body);
  try {
    // const user = await UserModel.create({ pseudo, email, password }); // avec la function create  save est inclut
    const userExiste = await UserModel.findOne({ pseudo: newUser.pseudo });

    if (userExiste)
      return res.status(400).json({ message: "Ce pseudo existe déjà" });
    else {
      const user = await newUser.save();
      const token = jwt.sign(
        { pseudo: user.pseudo, id: user._id },
        process.env.JWTKEY,
        { expiresIn: "1h" }
      );
      res.status(201).json({ user: user, token: token });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
};

//-------------------------------------- login User

export const loginUser = async (req, res) => {
  // on recupère les informations du front
  const { email, password } = req.body; // du front end  email=req.body.email et password =req.body.password

  try {
    // on cherche le email qui correspond
    const user = await UserModel.findOne({ email: email });

    if (user) {
      // on compare le mot de passe du front au back end
      const validity = await bcrypt.compare(password, user.password);

      // si le mot de pass n'est  pas correct
      if (!validity) {
        res.status(404).json("mot de passe incorrect");
      } else {
        //sinon on assigne un token
        const token = jwt.sign(
          { pseudo: user.pseudo, id: user._id },
          process.env.JWTKEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      // si on ne trouve pas l'user on envoie
      res.status(404).json("L'utilisateur n'existe pas");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
