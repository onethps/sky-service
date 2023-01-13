import User from "../models/users.js";

export const createUser = async (req, res, next) => {
  const newUser = new User({
    ...req.body,
  });

  try {
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (e) {
    next(e);
  }
};
