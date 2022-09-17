const { Router } = require("express");
const router = Router();
const { User } = require("../models/User.js");  //--->>sali de rutas
const axios = require("axios");

router.post("/register", async (req, res) => {
    ////--------->>>>>First post is create the user
    let { name, contact, email, address, password } = req.body;
    try {
        if (!name || !contact || !email || !address || !password) {
            return res.status(400).send("The field is required");
        } else if (name && contact && email && address && password) {
            const users = await User.findAll();
            const exists = users.find(
                (user) =>
                    user.name === name &&
                    user.contact === contact &&
                    user.email === email &&
                    user.address === address
            );
            if (!exists) {
                const newUser = await User.create({
                    name,
                    contact,
                    email,
                    address,
                    password,
                });
            }
            alert("User Created");
            res.status(201).send(newUser);   //----->>`the user ${newUser} Created with exit`
            return res.redirect("/login");
        }
    } catch (error) {
        console.log(error);
    }

    res.status(201).redirect("/login");
});

router.post("/login", (req, res) => {
    const { contact, password } = req.body;
    if (contact && password) {
        const user = User.find(
            (user) => user.contact === contact && user.password === password
        );
        if (user) {
            req.session.userId = user.id;
            return res.redirect("/home");
        } else {
            alert("User not found");
            return res.redirect("/login");
        }
    }
    res.redirect("/home");
});

module.exports = router;
