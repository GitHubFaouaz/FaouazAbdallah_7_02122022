import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routers/AuthRoute.js";
import userRoutes from "./routers/UserRoute.js";
import dotenv from "dotenv";
import "./db.js";
import morgan from "morgan";

const app = express();
dotenv.config();
mongoose
  .connect(
    "mongodb+srv://faouazPjt7:mongoBD15@cluster0.947h4.mongodb.net/projet7?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));

// permet de voir les requettes Get ,Post sur le terminal
app.use(morgan("tiny"));
app.use(express.json());

//.................................................. ROUTES ..............................
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export default app;
