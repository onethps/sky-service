import Store from "../models/Store.js";

export const createStore = async (req, res, next) => {
  const newStore = new Store({
    ...req.body,
  });

  try {
    const saveStore = await newStore.save();
    res.status(200).json(saveStore);
  } catch (e) {
    next(e);
  }
};

export const findStore = async (req, res, next) => {
  try {
    await Product.findById(req.params.userId);
    res.status(200).json("The Store was successful");
  } catch (e) {
    next(e);
  }
};
