const server = require('./server/index.js');
const { conn } = require('./server/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {    //alter: true, force: false      alter: true,
  server.listen(8080, () => {
    console.log('%s listening at 8080'); // eslint-disable-line no-console
  });
});
