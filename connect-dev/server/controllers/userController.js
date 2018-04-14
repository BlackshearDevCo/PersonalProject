const logout = (req,res) => {
  req.session.destroy(() => {
    res.redirect("http://localhost:3000/#/");
  });
};

const getUser = (req,res) => {
  if(!req.user) {
    res.status(401).json({message: "Not Authorized"})
  }
  else{
    res.status(200).json(req.user);
  }
};

module.exports = {
  logout,
  getUser
};
