

// import express from "express";
// import authController from "../controllers/authController.js";
// const   router = express.Router();



// router.post('/signup', authController.registerSchema)
// router.post('/signin', authController.loginSchema)
// // router.post(
// //   "/signup",
// //   authController.registerSchema,  // Joi validation
// //   authController.register         // Controller signup
// // );

// // router.post(
// //   "/signin",
// //   authController.loginSchema,     // Joi validation
// //   authController.login            // Controller login
// // );

// export default router;

import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", register);  // maintenant renvoie du JSON
router.post("/signin", login);

export default router;
