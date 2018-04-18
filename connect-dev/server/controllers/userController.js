const logout = (req, res) => {
  req.session.destroy();
  req.logout()
  res.redirect('http://localhost:3000/#/')
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
  const { user_type, birthdate, bio, experience, location, company } = req.body;

  db
    .update_user_info([req.params.id, user_type, birthdate, bio, experience, location, company])
    .then(response => res.status(200).json(response))
    .catch(err => re.status(500).json(err));
};

module.exports = {
  logout,
  getUser,
  getAllUsers,
  updateUserInfo
};
