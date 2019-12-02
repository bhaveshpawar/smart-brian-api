const handleSignin = (req, res, database, bcrypt) => {
  const { email } = req.body;
  database
    .select("email", "hash")
    .from("login")
    .where({ email })
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return database
          .select("*")
          .from("users")
          .where({ email })
          .then(user => {
            res.json(user[0]);
          });
      } else {
        res.json("Wrong credentials");
      }
    })
    .catch(err => res.status(400).json("Error"));
};

module.exports = { handleSignin };
