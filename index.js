const server = require("./server");
const { conn } = require("./server/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
    //alter: true, force: false      alter: true,
    server.listen(8080, () => {
        console.log("%s listening at 8080", "localhost"); // eslint-disable-line no-console
    });
});
