import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { registerSchema, loginSchema } from "../validation/authValidation.js";

dotenv.config();

// my code register and login functions
export const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    const existsEmail = await User.findOne({ where: { email } });
    if (existsEmail) {
      return res.status(400).json({ message: "Email déjà utilisé." });
    }

    const existsUsername = await User.findOne({ where: { name } });
    if (existsUsername) {
      return res.status(400).json({ message: "Nom d'utilisateur déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    
    });

    // Retour JSON
    return res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Erreur register :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// ------------------- LOGIN -------------------
export const login = async (req, res) => {
  try {
    // Validation des données avec Joi
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, password } = req.body;

    // Chercher l'utilisateur
    const user = await User.findOne({ where: { name } });
    if (!user) {
      return res.status(400).json({ message: "Nom d'utilisateur incorrect." });
    }

    // Vérifier le mot de passe
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Retour JSON
    return res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Erreur login:", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
