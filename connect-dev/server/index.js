require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { json } = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const app = express();

app.use(json());
app.use(cors());

const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}!`))