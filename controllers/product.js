import Product from "../models/products.js";
import { Techcard } from "../models/techcard.js";

export const createProduct = async (req, res, next) => {
  const newProduct = new Product({
    ...req.body,
  });

  try {
    const saveProduct = await newProduct.save();
    res.status(200).json(saveProduct);
  } catch (e) {
    next(e);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Succeffully deleted");
  } catch (e) {
    next(e);
  }
};

export const findProduct = async (req, res, next) => {
  try {
    await Product.findById(req.body.id);
    res.status(200).json("Succeffully find");
  } catch (e) {
    next(e);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    let products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const createTechCard = async (req, res, next) => {
  const newTechCard = new Techcard({
    ...req.body,
  });

  try {
    const saveTechCard = await newTechCard.save();
    res.status(200).json(saveTechCard);
  } catch (e) {
    next(e);
  }
};

export const getTechCards = async (req, res, next) => {
  try {
    await Techcard.findById(req.body.id);
    res.status(200).json("Succeffully find techcards");
  } catch (e) {
    next(e);
  }
};
