require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const app = express();

const testCtrl = require('./controllers/testController');

app.use(json());
app.use(cors());

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db);
}).catch(err => console.log(err));

app.get('/api/test', testCtrl.test);

const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}!`));