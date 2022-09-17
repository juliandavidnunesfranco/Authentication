require("dotenv").config();
const { Router } = require("express");
const router = Router();
const { User } = require("../server/db.js"); //--->>sali de rutas
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    ////--------->>>>>First post is create the user
    let { name, contact, email, address, password } = req.body;
    const saltRounds = 10;
    try {
        if (!name || !contact || !email || !address || !password) {
            return res.status(400).send("The field is required");
        }

        const users = await User.findAll();
        const exists = users.find(
            (user) =>
                user.name === name &&
                user.contact === contact &&
                user.email === email &&
                user.address === address
        );

        if (exists) {
            res.status(400).send("Ya existe un usuario con estas propiedades.");
            return;
        }

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            const newUser = await User.create({
                name,
                contact,
                email,
                address,
                password: hash,
            });
            console.log("User Created");
            res.status(201).send(newUser);
        });

        //----->>`the user ${newUser} Created with exit`
        return;
        // return res.redirect("/login");
    } catch (error) {
        console.log(error);
    }

    res.status(201).redirect("/login");
});

router.post("/login", async (req, res) => {
    const { JWT_SECRET } = process.env;
    const { contact, password } = req.body;

    if (contact && password) {
        const users = await User.findAll();
        const user = users.find((user) => user.contact === contact);
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    const token = jwt.sign({ id: user.id }, JWT_SECRET);
                    // req.session.userId = user.id;
                    return res.status(200).send({
                        token,
                    });
                } else {
                    console.log("Clave incorrecta.");
                    return res.status(404).send("Clave incorrecta.");
                }
            });
        } else {
            console.log("User not found");
            return res.status(404).send("No se encontro el usuario.");
        }
    }

    // res.status(500).send("Error en el servidor.");
});

module.exports = router;
