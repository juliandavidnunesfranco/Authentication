const { Router } = require("express");
// Importar todos los routers;
const users = require("./userRoute");
const password = require("./passwordRoute");


const router = Router();

router.use("/user", userRoute);
router.use("/password", passwordRoute);


module.exports = router;
