const db = require("../../../models");
const { User } = db.sequelize.models;

const updateUserInfo = async (req, res) => {
  console.log(req.body);
  const { username, email, first_name, last_name, address, postal, birth_date } = req.body;
  await User.update(
    {
      username: username,
      first_name: first_name,
      last_name: last_name,
      address: address,
      email: email,
      postal: postal,
      birth_date: birth_date,
    },
    { where: { id: req.params.id } }
  );
  const updatedUser = await User.findByPk(req.params.id, {
    attributes: ["username"],
  });

  res.json(updatedUser);
};

module.exports = { updateUserInfo };
