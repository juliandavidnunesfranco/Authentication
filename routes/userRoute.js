const express = require("express");
const { User, Password } = require('../server/db.js');
const router = express.Router();

router.post("/", async (req, res) => {
    let { name, contact, email, addres, password } = req.body;
    try {
      if (name) {
              const allVideoGame = await getAllVideogames();
              const isVideogame = allVideoGame.find((e) => e.name.toLowerCase() === name.toLowerCase());
              if (!isVideogame) {
                    const videogame = await Videogame.create({
                            name,
                            description,
                            released,
                            rating,
                            img,
                            platforms,
                            genres,
                    });
                const genreDb = await Genre.findAll({
                                where: { name: genres },
                });
                const platformDb = await Platform.findAll({
                                where: { name: platforms },
                });
                    await videogame.addGenre(genreDb), videogame.addPlatform(platformDb);
                    res.status(201).send("Video Game created successfully");
              }
        res.status(404).send("Videogame name already exist"); ///cambiar leyenda
      }
      if (!name) return res.status(404).send("Videogame name is obligtory");
    } catch (error) {
      console.log(error);
    }
      
});