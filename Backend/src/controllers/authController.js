import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default {
  register: async (req, res) => {
    try {
      const { username, email, password, role } = req.body;

      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ message: "Tous les champs sont obligatoires." });
      }

      // vérifier email ou username déjà utilisés
      const exists = await User.findOne({ where: { email } });

      if (exists) {
        return res.status(400).json({ message: "Email déjà utilisé." });
      }

      const existsUsername = await User.findOne({ where: { username } });
      if (existsUsername) {
        return res
          .status(400)
          .json({ message: "Nom d'utilisateur déjà utilisé." });
      }

      const user = await User.create({
        username,
        email,
        password,
        role: role || "user",
      });

      res.status(201).json({
        message: "Utilisateur créé avec succès",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Erreur register :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Nom d'utilisateur et mot de passe requis." });
      }

      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Nom d'utilisateur incorrect." });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(400).json({ message: "Mot de passe incorrect." });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        message: "Connexion réussie",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          password: user.password,
        },
      });
    } catch (error) {
      console.error("Erreur login:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
};
