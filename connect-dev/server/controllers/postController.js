const getPosts = (req, res) => {
  const db = req.app.get("db");

  db
    .get_posts()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

const newPost = (req, res) => {
  const db = req.app.get("db");
  const { post, id } = req.body;

  db
    .new_post([id, post])
    .then(response => getPosts(req, res))
    .catch(err => res.status(500).json(err));
};

const getEmployersPosts = (req, res) => {
  const db = req.app.get("db");

  db
    .get_employers_posts()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

const getUserPosts = (req, res) => {
  const db = req.app.get("db");

  db
    .get_user_posts([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

const deletePost = (req, res) => {
  const db = req.app.get("db");

  db
    .delete_post([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

module.exports = {
  newPost,
  getPosts,
  getEmployersPosts,
  getUserPosts,
  deletePost
};
