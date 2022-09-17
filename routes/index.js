const { Router } = require("express");
const router = Router();

router.post("/register", async (req, res) => {
    // let {name} = req.body;
    res.status(201).send();
});

module.exports = router;
