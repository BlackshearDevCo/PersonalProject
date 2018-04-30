require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const app = express();

const userCtrl = require("./controllers/userController");
const postCtrl = require("./controllers/postController");

app.use(json());
app.use(cors());

const {
  SESSION_SECRET,
  CONNECTION_STRING,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET
} = process.env;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000000
    }
  })
);

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => console.log(err));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "/auth",
      scope: "openid email profile"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  app
    .get("db")
    .getUserByAuthId(user.id)
    .then(response => {
      if (!response[0]) {
        app
          .get("db")
          .addUserByAuthId([
            user.displayName,
            user.id,
            user.picture,
            user.emails[0].value
          ])
          .then(res => {
            return done(null, res[0]);
          })
          .catch(err => console.log(err));
      } else {
        return done(null, response[0]);
      }
    })
    .catch(err => console.log(err));
});

passport.deserializeUser((obj, done) => {
  return done(null, obj);
});

app.get(
  "/auth",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/",
    failureRedirect: "http://localhost:3001/auth"
  })
);

function authenticate(req, res, next) {
  if (!req.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

app.get("/api/logout", userCtrl.logout);
app.get("/api/user", userCtrl.getUser);
app.get("/api/getPosts", postCtrl.getPosts);
app.get("/api/getEmployersPosts", postCtrl.getEmployersPosts);
app.get("/api/getAllUsers/:id", userCtrl.getAllUsers);
app.get("/api/getUserPosts/:id", postCtrl.getUserPosts);
app.get("/api/getConnectionCount/:id", userCtrl.getUserConnections);
app.get("/api/getNotifications/:id", userCtrl.getNotifications);
app.post("/api/connectWithUser/:id", userCtrl.connectWithUser);
app.post("/api/newPost", postCtrl.newPost);
app.put("/api/updateUserInfo/:id", userCtrl.updateUserInfo);
app.put("/api/sendNotification/:id", userCtrl.sendNotification);
app.delete("/api/deletePost/:id", postCtrl.deletePost);

const port = 3001;
let server = app.listen(port, () => console.log(`Listening on port ${port}!`));

//WEB SOCKETS

const socket = require("socket.io");
io = socket(server);

io.on("connection", socket => {
  console.log(socket.id);

  socket.on("SEND_MESSAGE", data => {
    io.emit("RECIEVE_MESSAGE", data);
  });
});

//NODEMAILER

const nodemailer = require("nodemailer");

app.post("/api/sendMail", () => {
  nodemailer.createTestAccount((err, account) => {
    console.log(account);
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });

    let mailOptions = {
      to: "theshiftybapple@gmail.com",
      subject: "ConnectDev",
      test: `Aaron Blackshear wants to Connect!`,
      html: `<p>Hello Jasmine! Aaron Blackshear wants to get in touch with you. Check out their profile <a href='http://localhost:3000/#/user/8'>here</a>!
      If you like them, don't hesitate to get back in touch with them. Their email is: theshiftybapple@gmail.com <br>
      Have a great day!
      </p>`
    };
    // let mailOptions = {
    //   to: reciever,
    //   subject: 'ConnectDev',
    //   test: `${user} wants to Connect!`,
    //   html: `<p>Hello ${recieverName}! ${sender} wants to get in touch with you. Check out their profile <a href='${link}'>here</a>!</p>`
    // };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(info.messageId);
      console.log(nodemailer.getTestMessageUrl(info));
    });
  });
});
