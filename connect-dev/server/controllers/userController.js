const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("http://localhost:3000/#/");
  });
};

const getUser = (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Not Authorized" });
  } else {
    res.status(200).json(req.user);
  }
};

const changeBio = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.params;
  const { bio } = req.body;

  db
    .change_bio([id, bio])
    .then(response => {
      res.status(200).json(response)})
    .catch(err => res.status(500).json(err));
};

module.exports = {
  logout,
  getUser,
  changeBio
};
