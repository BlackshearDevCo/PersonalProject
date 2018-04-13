const test = (req, res) => {
    const db = req.app.get('db');

    db.test_get()
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
};

module.exports = {
  test
};
