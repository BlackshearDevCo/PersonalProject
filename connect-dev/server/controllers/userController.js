const nodemailer = require("nodemailer");

const logout = (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect("http://localhost:3000/#/");
};

const getUser = (req, res) => {
  const db = req.app.get("db");
  const { auth_id } = req.user;

  db
    .getUserByAuthId(auth_id)
    .then(user => {
      res.status(200).json(user[0]);
    })
    .catch(err => res.status(500).json(err));
};

const getAllUsers = (req, res) => {
  const db = req.app.get("db");

  db
    .get_all_users([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

const updateUserInfo = (req, res) => {
  const db = req.app.get("db");
  const {
    user_type,
    birthdate,
    bio,
    experience,
    location,
    company,
    portfolio
  } = req.body;

  db
    .update_user_info([
      req.params.id,
      user_type,
      birthdate,
      bio,
      experience,
      location,
      company,
      portfolio
    ])
    .then(response => res.status(200).json(response))
    .catch(err => re.status(500).json(err));
};

const connectWithUser = (req, res) => {
  const db = req.app.get("db");

  db
    .connect_with_user([req.params.id, req.body.connectorId])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

const getUserConnections = (req, res) => {
  const db = req.app.get("db");

  db
    .get_connection_count([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

const sendNotification = (req, res) => {
  const db = req.app.get("db");

  db
    .send_notification([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

const getNotifications = (req, res) => {
  const db = req.app.get("db");

  db
    .get_notifications([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

const sendEmail = (req, res) => {
  const { recieverEmail, recieverName, senderEmail, senderName, link } = req.body;

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

    // let mailOptions = {
    //   to: "theshiftybapple@gmail.com",
    //   subject: "ConnectDev",
    //   test: `Aaron Blackshear wants to Connect!`,
    //   html: `<p>Hello Jasmine! Aaron Blackshear wants to get in touch with you. Check out their profile <a href='http://localhost:3000/#/user/8'>here</a>!
    //   If you like them, don't hesitate to get back in touch with them. Their email is: theshiftybapple@gmail.com <br>
    //   Have a great day!
    //   </p>`
    // };
    let mailOptions = {
      to: recieverEmail,
      subject: 'ConnectDev',
      test: `${senderName} wants to Connect!`,
      html: `<p>Hello ${recieverName}! ${senderName} wants to get in touch with you. Head to <a href='http://localhost:3000/#/'>ConnectDev</a> and look them up.
       If you like them, don't hesitate to get back in touch with them. Their email is: ${senderEmail} <br>
       Have a great day!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(info.messageId);
      console.log(nodemailer.getTestMessageUrl(info));
    });
  });
}

module.exports = {
  logout,
  getUser,
  getAllUsers,
  updateUserInfo,
  connectWithUser,
  getUserConnections,
  sendNotification,
  getNotifications,
  sendEmail
};
