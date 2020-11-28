/*
Rutas de Usuario /Auth
host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { createUser, renewToken, loginUser } = require("../controllers/auth");
const jwt = require("../helpers/jwt");
const { validarCampos } = require("../middlewares/field-validator");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/register",
  [
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("email", "El email es obligatorio.").not().isEmpty(),
    check(
      "password",
      "El password debe de tener mínimo 6 caracteres."
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio.").not().isEmpty(),
    check("password", "Password incorrecto").isLength({ min: 6 }),
    validarCampos,
  ],
  loginUser
);

router.get("/renew", validarJWT, renewToken);

module.exports = router;
