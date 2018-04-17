const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("http://localhost:3000/#/");
  });
};

const getUser = (req, res) => {
  // if (!req.user) {
  //   res.status(401).json({ message: "Not Authorized" });
  // } else {
  //   res.status(200).json(req.user);
  // }
  const db = req.app.get("db");
  const { auth_id } = req.user;

  db
    .getUserByAuthId(auth_id)
    .then(user => {
      res.status(200).json(user[0]);
    })
    .catch(err => res.status(500).json(err));
};

const changeBio = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.params;
  const { bio } = req.body;

  db
    .change_bio([id, bio])
    .then(response => {
      res.status(200).json(response);
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

const chooseUserType = (req, res) => {
  const db = req.app.get("db");

  db
    .choose_user_type([req.params.id, req.body.num])
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => res.status(500).json(err));
};

const chooseUserExperience = (req, res) => {
  const db = req.app.get("db");

  db
    .choose_user_experience([req.params.id, req.body.num])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(200).json(err));
};

const enterBirthdate = (req, res) => {
  const db = req.app.get("db");

  db
    .enter_birthdate([req.params.id, req.body.birthday])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

const enterLocation = (req, res) => {
  const db = req.app.get("db");

  db
    .enter_location([req.params.id, req.body.location])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

const updateUserInfo = (req, res) => {
  const db = req.app.get("db");
  const { user_type, birthdate, bio, experience, location, company } = req.body;

  db
    .update_user_info([req.params.id, user_type, birthdate, bio, experience, location, company])
    .then(response => res.status(200).json(response))
    .catch(err => re.status(500).json(err));
};

module.exports = {
  logout,
  getUser,
  changeBio,
  getAllUsers,
  chooseUserType,
  chooseUserExperience,
  enterBirthdate,
  enterLocation,
  updateUserInfo
};
