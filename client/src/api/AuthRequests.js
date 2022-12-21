import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const signUp = (formData) => API.post("/api/auth/register", formData); // data du formulaire

export const logIn = (formData) => API.post("/auth/login", formData); // l'adresse pour le login(post)
