const user = require("../db/models/user");

const signup =  (req, res, next) => {
  const body = req.body;

  if (!["admin", "ceo","madam",'officer',"cert"].includes(body.role)) {
    return res.status(400).json({
      status: "failed",
      message: "invalid user",
    });
  }

  const newUser =   user.create({
    role: body.role,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  });

  if (!newUser) {
    return res.status(400).json({
      status: "failed",
      message: "user not created",
    });
  }

  return res.status(201).json({
    status: "successful",
    data:newUser
  });
};

module.exports = { signup };
